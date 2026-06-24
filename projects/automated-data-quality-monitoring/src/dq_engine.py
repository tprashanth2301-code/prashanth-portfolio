import pandas as pd
import snowflake.connector
import uuid
import logging
from datetime import datetime

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class DQEngine:
    def __init__(self, connection_config):
        self.config = connection_config
        self.conn = None

    def connect(self):
        try:
            self.conn = snowflake.connector.connect(
                user=self.config['user'],
                password=self.config['password'],
                account=self.config['account'],
                warehouse=self.config['warehouse'],
                database=self.config['database'],
                schema=self.config['schema']
            )
            logging.info("Successfully connected to Snowflake.")
        except Exception as e:
            logging.error(f"Error connecting to Snowflake: {e}")
            raise

    def close(self):
        if self.conn:
            self.conn.close()
            logging.info("Snowflake connection closed.")

    def fetch_rules(self, dataset_name=None):
        query = "SELECT * FROM DATA_QUALITY_DB.MONITORING.DQ_RULES WHERE IS_ACTIVE = TRUE"
        if dataset_name:
            query += f" AND DATASET_NAME = '{dataset_name}'"
        
        return pd.read_sql(query, self.conn)

    def run_check(self, rule):
        rule_id = rule['RULE_ID']
        sql_query = rule['SQL_QUERY']
        
        logging.info(f"Running check for rule: {rule['RULE_NAME']}")
        
        try:
            # This is a simplified logic. In a real scenario, you might need to handle
            # different types of DQ checks (e.g., counts, profiling, etc.)
            cursor = self.conn.cursor()
            cursor.execute(sql_query)
            failed_count = cursor.fetchone()[0]
            
            # Assuming we fetch total records for failure rate calculation
            # This would normally be part of a more complex metadata fetch
            cursor.execute(f"SELECT COUNT(*) FROM {rule['DATASET_NAME']}")
            total_count = cursor.fetchone()[0]
            
            status = 'PASS' if failed_count == 0 else 'FAIL'
            failure_rate = (failed_count / total_count) if total_count > 0 else 0
            
            result = {
                'RESULT_ID': str(uuid.uuid4()),
                'RULE_ID': rule_id,
                'TOTAL_RECORDS': total_count,
                'FAILED_RECORDS': failed_count,
                'FAILURE_RATE': failure_rate,
                'STATUS': status,
                'ERROR_MESSAGE': None
            }
            return result
        except Exception as e:
            logging.error(f"Error executing rule {rule_id}: {e}")
            return {
                'RESULT_ID': str(uuid.uuid4()),
                'RULE_ID': rule_id,
                'TOTAL_RECORDS': 0,
                'FAILED_RECORDS': 0,
                'FAILURE_RATE': 0,
                'STATUS': 'ERROR',
                'ERROR_MESSAGE': str(e)
            }

    def save_results(self, result):
        query = """
        INSERT INTO DATA_QUALITY_DB.MONITORING.DQ_RESULTS 
        (RESULT_ID, RULE_ID, TOTAL_RECORDS, FAILED_RECORDS, FAILURE_RATE, STATUS, ERROR_MESSAGE)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor = self.conn.cursor()
        cursor.execute(query, (
            result['RESULT_ID'], 
            result['RULE_ID'], 
            result['TOTAL_RECORDS'], 
            result['FAILED_RECORDS'], 
            result['FAILURE_RATE'], 
            result['STATUS'], 
            result['ERROR_MESSAGE']
        ))
        self.conn.commit()

    def run_all_checks(self, dataset_name=None):
        rules = self.fetch_rules(dataset_name)
        for _, rule in rules.iterrows():
            result = self.run_check(rule)
            self.save_results(result)
            logging.info(f"Result for {rule['RULE_NAME']}: {result['STATUS']}")

if __name__ == "__main__":
    # Example usage (placeholders for credentials)
    config = {
        'user': 'YOUR_USER',
        'password': 'YOUR_PASSWORD',
        'account': 'YOUR_ACCOUNT',
        'warehouse': 'COMPUTE_WH',
        'database': 'DATA_QUALITY_DB',
        'schema': 'MONITORING'
    }
    
    # engine = DQEngine(config)
    # engine.connect()
    # engine.run_all_checks()
    # engine.close()
    print("DQ Engine initialized. (Credentials required for execution)")

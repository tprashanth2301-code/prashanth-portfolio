# Automated Data Quality Monitoring System

## Overview
This project is an **Automated Data Quality (DQ) Monitoring System** designed to flag data inconsistencies across enterprise datasets. It scales validation from a single dataset to over 100+ client datasets, significantly reducing recurring data issues.

## Key Features
- **Scalable Validation**: Built to handle 100+ enterprise datasets using a rule-based engine.
- **Automated Detection**: Flags inconsistencies such as null values, duplicates, and schema drift.
- **Snowflake Integration**: Leverages Snowflake for high-performance data processing and storage of DQ metadata.
- **Reporting & Auditing**: Stores historical DQ results for trend analysis and audit trails.
- **45% Reduction in Issues**: Designed to cut recurring data quality issues by nearly half through proactive monitoring.

## Tech Stack
- **Language**: Python 3.x
- **Database**: Snowflake
- **SQL**: Advanced SQL for data validation checks
- **Libraries**: `snowflake-connector-python`, `pandas`

## Project Structure
```text
├── config/             # Configuration files (placeholders)
├── sql/                # SQL scripts
│   ├── setup/          # Environment setup (DB, Schema, Tables)
│   └── checks/         # SQL templates for DQ checks
├── src/                # Python source code
│   └── dq_engine.py    # Core DQ engine logic
├── tests/              # Unit tests
└── requirements.txt    # Python dependencies
```

## How It Works
1. **Rule Definition**: DQ rules are stored in a centralized Snowflake table (`DQ_RULES`).
2. **Execution**: The Python `DQEngine` fetches active rules and executes them against target datasets in Snowflake.
3. **Logging**: Results (pass/fail/error) are logged back into the `DQ_RESULTS` table.
4. **Alerting**: (Conceptual) The system can be integrated with Slack/Email to notify stakeholders of failures.

## Setup Instructions
1. **Snowflake Setup**: Run the script in `sql/setup/snowflake_setup.sql` in your Snowflake worksheet.
2. **Environment Config**: Update the connection parameters in `src/dq_engine.py` or use environment variables.
3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
4. **Run Monitoring**:
   ```bash
   python src/dq_engine.py
   ```

## Author
**Prashanth Terupelli**
*Senior Product Analyst*

WITH
    T AS (
        SELECT
            question_id AS survey_log,
            (sum(action = 'answer') OVER (PARTITION BY question_id)) / (
                sum(action = 'show') OVER (PARTITION BY question_id)
            ) AS ratio
        FROM SurveyLog
    )
SELECT survey_log
FROM T
ORDER BY ratio DESC, 1
LIMIT 1;

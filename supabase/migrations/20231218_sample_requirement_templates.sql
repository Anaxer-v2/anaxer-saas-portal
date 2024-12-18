-- Insert sample templates
DO $$
DECLARE
    entity_id UUID;
    creator_id UUID;
BEGIN
    -- Get the first entity and its creator for our sample data
    SELECT id, created_by INTO entity_id, creator_id FROM entities LIMIT 1;

    IF entity_id IS NOT NULL THEN
        -- Document upload templates
        INSERT INTO requirement_templates (entity_id, title, instruction, type, form_json, created_by) VALUES
        (
            entity_id,
            'Proof of Identity',
            'Please provide a valid government-issued photo ID (passport, driver''s license, or national ID card)',
            'document_upload',
            '{
                "pages": [{
                    "name": "page1",
                    "elements": [{
                        "type": "file",
                        "name": "identity_document",
                        "title": "Upload your ID document",
                        "acceptedTypes": ".jpg,.jpeg,.png,.pdf",
                        "maxSize": 5000000,
                        "allowMultiple": false
                    }]
                }]
            }'::jsonb,
            creator_id
        ),
        (
            entity_id,
            'Bank Statements',
            'Please provide your last 3 months of bank statements',
            'document_upload',
            '{
                "pages": [{
                    "name": "page1",
                    "elements": [{
                        "type": "file",
                        "name": "bank_statements",
                        "title": "Upload bank statements",
                        "acceptedTypes": ".pdf",
                        "maxSize": 10000000,
                        "allowMultiple": true,
                        "maxCount": 3
                    }]
                }]
            }'::jsonb,
            creator_id
        ),
        (
            entity_id,
            'Employment Details',
            'Please fill out your current employment information',
            'custom_form',
            '{
                "pages": [{
                    "name": "employment",
                    "elements": [{
                        "type": "text",
                        "name": "employer_name",
                        "title": "Current Employer Name",
                        "isRequired": true
                    }, {
                        "type": "text",
                        "name": "position",
                        "title": "Position/Title",
                        "isRequired": true
                    }, {
                        "type": "text",
                        "inputType": "number",
                        "name": "years_employed",
                        "title": "Years with current employer",
                        "isRequired": true
                    }, {
                        "type": "text",
                        "inputType": "number",
                        "name": "annual_income",
                        "title": "Annual Income",
                        "isRequired": true
                    }]
                }]
            }'::jsonb,
            creator_id
        ),
        (
            entity_id,
            'Debts and Liabilities',
            'Please provide information about your current debts and financial commitments',
            'custom_form',
            '{
                "pages": [{
                    "name": "debts",
                    "elements": [{
                        "type": "panel",
                        "name": "credit_cards",
                        "title": "Credit Cards",
                        "elements": [{
                            "type": "text",
                            "inputType": "number",
                            "name": "total_credit_limit",
                            "title": "Total Credit Card Limits"
                        }, {
                            "type": "text",
                            "inputType": "number",
                            "name": "current_credit_balance",
                            "title": "Current Total Balance"
                        }]
                    }, {
                        "type": "panel",
                        "name": "loans",
                        "title": "Existing Loans",
                        "elements": [{
                            "type": "text",
                            "inputType": "number",
                            "name": "personal_loans",
                            "title": "Personal Loans Balance"
                        }, {
                            "type": "text",
                            "inputType": "number",
                            "name": "car_loans",
                            "title": "Car Loans Balance"
                        }, {
                            "type": "text",
                            "inputType": "number",
                            "name": "mortgage",
                            "title": "Mortgage Balance"
                        }]
                    }]
                }]
            }'::jsonb,
            creator_id
        );
    END IF;
END $$; 
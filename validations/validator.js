const { check } = require('express-validator')
module.exports = {

    validateDates: [
        check('startDate').
            trim().
            notEmpty().withMessage('startDate is required').
            isDate(delimiters = ['-']).withMessage('startDate format is invalid. Valid date format is that: YYYY-MM-DD'),

        check('endDate').
            trim().
            notEmpty().withMessage('endDate is required').
            isDate(delimiters = ['-']).withMessage('endDate format is invalid. Valid date format is that: YYYY-MM-DD'),

        check('startDate')
            // Custom validator
            .custom((startDate, { req }) => {

                // Fetch year, month and day of
                // respective dates
                const [sy, sm, sd] = startDate.split('-')
                const [ey, em, ed] = req.body.endDate.split('-')

                // Constructing dates from given
                // string date input
                const sDate = new Date(sy, sm, sd)
                const eDate = new Date(ey, em, ed)

                // Validate start date so that it must
                // comes before end date
                if (sDate > eDate) {
                    throw new Error(
                        'startDate must be less than or equal endDate')
                }
                return true
            })]
    ,

    validateCounts: [
        check('minCount').
            notEmpty().withMessage('minCount is required'),
        check('maxCount').
            notEmpty().withMessage('maxCount is required'),
        check('minCount')

            .custom((minCount, { req }) => {

                if (typeof minCount != 'number') {
                    throw new Error(
                        'minCount must be an number e.g: 100')
                }
                return true
            }),

        check('maxCount')
            .custom((maxCount, { req }) => {

                if (typeof maxCount != 'number') {
                    throw new Error(
                        'maxCount must be an number e.g: 100')
                }
                return true
            })]

}

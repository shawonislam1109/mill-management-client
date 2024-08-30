
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import PropTypes from 'prop-types'

export default function DatePickerViews({ filterFunction, month }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                format={"MMMM YYYY"}
                value={dayjs(month)}
                onChange={(date) => filterFunction(date)}
                slotProps={{
                    textField: {
                        fullWidth: true,
                        size: 'small',
                        sx: {
                            width: '200px',
                            color: 'gray',          // Text color
                            '& .MuiInputBase-root': {
                                color: 'gray',       // Input text color
                            },
                            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'gray', // Border color
                            },
                            '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'gray', // Border color on hover
                            },
                        },
                    },
                }}
                label={'Select Month'}
                views={['month', 'year']}
            />


        </LocalizationProvider>
    );
}

DatePickerViews.propTypes = {
    filterFunction: PropTypes.func,
    month: PropTypes.string
}
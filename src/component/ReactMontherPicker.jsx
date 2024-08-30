import PropTypes from "prop-types";
import MonthPicker from "react-month-picker";
import "react-month-picker/css/month-picker.css";

function MonthPickerComponent({ selectedMonth, setSelectedMonth }) {
  const currentYear = new Date().getFullYear();
  const yearRange = [currentYear, currentYear + 1];

  const handleMonthChange = (year, month) => {
    setSelectedMonth({ year, month });
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <MonthPicker
        years={yearRange}
        value={selectedMonth}
        lang={{
          months: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        }}
        onChange={handleMonthChange}
      >
        <input
          readOnly
          value={selectedMonth}
          placeholder="Select Month"
          style={{ padding: "8px", marginRight: "10px", cursor: "pointer" }}
        />
      </MonthPicker>
    </div>
  );
}

MonthPickerComponent.propTypes = {
  setSelectedMonth: PropTypes.func,
  selectedMonth: PropTypes.object,
};

export default MonthPickerComponent;

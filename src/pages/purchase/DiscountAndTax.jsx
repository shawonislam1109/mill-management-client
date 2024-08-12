import { Stack, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

const DiscountAndTax = ({ control, name1, name2 }) => {
  return (
    <div>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        {/* amount */}
        <Controller
          control={control}
          name={name1}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              size="small"
              inputRef={field.ref}
              type="number"
              variant="outlined"
              label="amount"
              value={field.value}
              onChange={(e) => field.onChange(Number(e.target.value))}
              sx={{ width: "9rem" }}
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />

        {/* discount */}
        <Controller
          control={control}
          name={name2}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              size="small"
              inputRef={field.ref}
              type="number"
              variant="outlined"
              label="percentage"
              value={field.value}
              onChange={(e) => field.onChange(Number(e.target.value))}
              sx={{ width: "9rem" }}
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />
      </Stack>
    </div>
  );
};

DiscountAndTax.propTypes = {
  control: PropTypes.func,
  index: PropTypes.number,
  name1: PropTypes.string,
  name2: PropTypes.string,
};

export default DiscountAndTax;

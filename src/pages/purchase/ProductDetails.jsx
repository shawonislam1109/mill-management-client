import { Grid, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

const ProductDetails = ({ control, item, name }) => {
  return (
    <>
      <Grid item xs={12} md={6} lg={6}>
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              size="small"
              inputRef={field.ref}
              type="number"
              variant="outlined"
              label={item}
              value={field.value}
              onChange={(e) => field.onChange(Number(e.target.value))}
              error={Boolean(error)}
              helperText={error?.message}
              sx={{ width: "9rem" }}
            />
          )}
        />
      </Grid>
    </>
  );
};

ProductDetails.propTypes = {
  control: PropTypes.func,
  item: PropTypes.string,
  name: PropTypes.string,
};

export default ProductDetails;

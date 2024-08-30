import {
  Autocomplete,
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import {
  CloseOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { DatePicker, DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const InputField = ({ formData, control, column }) => {
  const theme = useTheme();
  //common input types
  const commonInputTypes = ["text", "email", "number", "textarea"];
  const [showPassword, setShowPassword] = useState(false);

  const data = formData.map((item) => {
    if (item.visibility) {
      const itemColumn = item.column || column;
      if (commonInputTypes.includes(item.type)) {
        return (
          <Grid
            key={item.id}
            item
            xs={12 / itemColumn["xs"]}
            sm={12 / itemColumn["sm"]}
            md={12 / itemColumn["md"]}
            lg={12 / itemColumn["lg"]}
          >
            <InputLabel sx={{ display: "flex", alignItems: "center" }}>
              {item.label}
              {item.required && (
                <span style={{ color: "red", marginLeft: "4px" }}>*</span>
              )}
            </InputLabel>

            <Controller
              control={control}
              name={item.name}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  size={item.size}
                  inputRef={field.ref}
                  type={item.type}
                  placeholder={item.placeholder}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={Boolean(error)}
                  helperText={error?.message}
                  disabled={item.disabled}
                  fullWidth
                  {...(item.type === "textarea" && {
                    multiline: true,
                    minRows: 5,
                  })}
                  inputProps={{
                    readOnly: item?.readOnly,
                    ...(item.type === "number" && {
                      onWheel: (e) => e.currentTarget.blur(),
                    }),
                  }}
                />
              )}
            />
          </Grid>
        );
      } else if (item.type === "password") {
        return (
          <Grid
            key={item.id}
            item
            xs={12 / itemColumn["xs"]}
            sm={12 / itemColumn["sm"]}
            md={12 / itemColumn["md"]}
            lg={12 / itemColumn["lg"]}
          >
            <InputLabel sx={{ display: "flex", alignItems: "center" }}>
              {item.label}
              {item.required && (
                <span style={{ color: "red", marginLeft: "4px" }}>*</span>
              )}
            </InputLabel>

            <Controller
              control={control}
              name={item.name}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                <>
                  <OutlinedInput
                    {...field}
                    size={item.size}
                    inputRef={field.ref}
                    placeholder={item.placeholder}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    error={Boolean(error)}
                    disabled={item.disabled}
                    type={showPassword ? "text" : item.type}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? (
                            <EyeOutlined />
                          ) : (
                            <EyeInvisibleOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    fullWidth
                    {...(item.type === "textarea" && {
                      multiline: true,
                      minRows: 5,
                    })}
                    inputProps={{
                      ...(item.type === "number" && {
                        onWheel: (e) => e.currentTarget.blur(),
                      }),
                    }}
                  />
                  {Boolean(error) && (
                    <FormHelperText error id={item.id}>
                      {error?.message}
                    </FormHelperText>
                  )}
                </>
              )}
            />
          </Grid>
        );
      } else if (item.type === "single-select") {
        return (
          <Grid
            item
            key={item.id}
            xs={12 / itemColumn["xs"]}
            sm={12 / itemColumn["sm"]}
            md={12 / itemColumn["md"]}
            lg={12 / itemColumn["lg"]}
          >
            <InputLabel sx={{ display: "flex", alignItems: "center" }}>
              {item.label}
              {item.required && (
                <span style={{ color: "red", marginLeft: "4px" }}>*</span>
              )}
            </InputLabel>

            <Controller
              control={control}
              name={item.name}
              defaultValue=""
              render={({ field, fieldState: { error } }) => {
                return (
                  <>
                    <Autocomplete
                      id={item.id}
                      onChange={(_event, data) => field.onChange(data?.value)}
                      value={
                        item.options?.find(
                          (item) => item.value === field?.value
                        ) || null
                      }
                      options={item.options}
                      disabled={item.disabled}
                      fullWidth
                      size={item.size}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          // inputProps={{ inputMode: field.ref }}
                          // inputMode={field.ref}
                          placeholder={item.placeholder}
                          sx={{
                            "& .MuiAutocomplete-input.Mui-disabled": {
                              WebkitTextFillColor: theme?.palette?.text.primary,
                            },
                          }}
                          error={Boolean(error)}
                        />
                      )}
                    />
                    {Boolean(error) && (
                      <FormHelperText error id={item.id}>
                        {error?.message}
                      </FormHelperText>
                    )}
                  </>
                );
              }}
            />
          </Grid>
        );
      } else if (item.type === "checkbox") {
        return (
          <Grid
            item
            key={item.id}
            xs={12 / itemColumn["xs"]}
            sm={12 / itemColumn["sm"]}
            md={12 / itemColumn["md"]}
            lg={12 / itemColumn["lg"]}
          >
            <InputLabel sx={{ display: "flex", alignItems: "center" }}>
              {item.label}
              {item.required && (
                <span style={{ color: "red", marginLeft: "4px" }}>*</span>
              )}
            </InputLabel>
            <Controller
              name={item.name}
              control={control}
              defaultValue={[]}
              render={({ field, fieldState: { error } }) => {
                return (
                  <>
                    <Stack
                      {...field}
                      direction={item.direction}
                      component={FormGroup}
                      onChange={({ target: { checked, value } }) => {
                        if (checked) {
                          field.onChange([...field.value, value]);
                        } else {
                          field.onChange(
                            field.value.filter((element) => element !== value)
                          );
                        }
                      }}
                    >
                      {item?.options?.map((option) => {
                        return (
                          <FormControlLabel
                            key={option.value}
                            value={option.value}
                            control={<Checkbox size={item.size} />}
                            label={option.label}
                            disabled={
                              item.disabled ? item.disabled : option.disabled
                            }
                            labelPlacement="end"
                            checked={field.value.includes(option.value)}
                          />
                        );
                      })}
                    </Stack>
                    {Boolean(error) && (
                      <FormHelperText error id={item.id}>
                        {error?.message}
                      </FormHelperText>
                    )}
                  </>
                );
              }}
            />
          </Grid>
        );
      } else if (item.type === "radio") {
        return (
          <Grid
            item
            key={item.id}
            xs={12 / itemColumn["xs"]}
            sm={12 / itemColumn["sm"]}
            md={12 / itemColumn["md"]}
            lg={12 / itemColumn["lg"]}
          >
            <InputLabel sx={{ display: "flex", alignItems: "center" }}>
              {item.label}
              {item.required && (
                <span style={{ color: "red", marginLeft: "4px" }}>*</span>
              )}
            </InputLabel>
            <Controller
              name={item.name}
              control={control}
              defaultValue=""
              render={({ field, fieldState: { error } }) => {
                return (
                  <>
                    <RadioGroup
                      {...field}
                      aria-label={item.label}
                      onChange={(e) => field.onChange(e.target.value)}
                      row={item.direction === "row"}
                      value={field.value}
                    >
                      {item.options.map((option) => {
                        return (
                          <FormControlLabel
                            key={option.value}
                            value={option.value}
                            disabled={
                              item.disabled ? item.disabled : option.disabled
                            }
                            control={<Radio size={item.size} />}
                            label={option.label}
                            labelPlacement="end"
                            checked={field.value === option.value}
                          />
                        );
                      })}
                    </RadioGroup>
                    {Boolean(error) && (
                      <FormHelperText error id={item.id}>
                        {error?.message}
                      </FormHelperText>
                    )}
                  </>
                );
              }}
            />
          </Grid>
        );
      } else if (item.type === "date-picker") {
        return (
          <Grid
            item
            key={item.id}
            xs={12 / itemColumn["xs"]}
            sm={12 / itemColumn["sm"]}
            md={12 / itemColumn["md"]}
            lg={12 / itemColumn["lg"]}
          >
            <InputLabel sx={{ display: "flex", alignItems: "center" }}>
              {item.label}
              {item.required && (
                <span style={{ color: "red", marginLeft: "4px" }}>*</span>
              )}
            </InputLabel>
            <Controller
              key={item.id}
              control={control}
              name={item.name}
              render={({ field, fieldState: { error } }) => {
                return (
                  <>
                    <DatePicker
                      format={item.dateFormat || "MMMM DD, YYYY"}
                      value={dayjs(field.value)}
                      inputRef={field.ref}
                      disabled={item.disabled}
                      onChange={(date) =>
                        item.extraOnchange
                          ? item.extraOnchange(dayjs(date).toISOString())
                          : field.onChange(dayjs(date).toISOString())
                      }
                      minDate={item.minDate ? dayjs(item.minDate) : null}
                      maxDate={item.maxDate ? dayjs(new Date()) : null}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: Boolean(error),
                          size: item.size,
                        },
                      }}
                    />
                    {Boolean(error) && (
                      <FormHelperText error id={item.id}>
                        {error?.message}
                      </FormHelperText>
                    )}
                  </>
                );
              }}
            />
          </Grid>
        );
      } else if (item.type === "time-picker") {
        return (
          <Grid
            item
            key={item.id}
            xs={12 / itemColumn["xs"]}
            sm={12 / itemColumn["sm"]}
            md={12 / itemColumn["md"]}
            lg={12 / itemColumn["lg"]}
          >
            <InputLabel sx={{ display: "flex", alignItems: "center" }}>
              {item.label}
              {item.required && (
                <span style={{ color: "red", marginLeft: "4px" }}>*</span>
              )}
            </InputLabel>
            <Controller
              key={item.id}
              name={item.name}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TimePicker
                    ampm
                    openTo="hours"
                    ref={field.ref}
                    onChange={(date) => field.onChange(date)}
                    views={["hours", "minutes"]}
                    disabled={item.disabled}
                    format="h:mm a"
                    value={dayjs(field.value)}
                    minutesStep={item.minutesStep || 0}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: Boolean(error),
                        size: item.size,
                      },
                    }}
                  />
                  {Boolean(error) && (
                    <FormHelperText error id={item.id}>
                      {error?.message}
                    </FormHelperText>
                  )}
                </>
              )}
            />
          </Grid>
        );
      } else if (item.type === "date-time-picker") {
        return (
          <Grid
            item
            key={item.id}
            xs={12 / itemColumn["xs"]}
            sm={12 / itemColumn["sm"]}
            md={12 / itemColumn["md"]}
            lg={12 / itemColumn["lg"]}
          >
            <InputLabel sx={{ display: "flex", alignItems: "center" }}>
              {item.label}
              {item.required && (
                <span style={{ color: "red", marginLeft: "4px" }}>*</span>
              )}
            </InputLabel>
            <Controller
              key={item.id}
              name={item.name}
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <>
                    <DateTimePicker
                      inputRef={field.ref}
                      minutesStep={item.minutesStep || 0}
                      format={item.dateFormat || "MMMM DD, YYYY h:mm A"}
                      timeSteps={{ hours: item.hour, minutes: item.minutes }}
                      value={dayjs(field.value)}
                      onChange={(date) =>
                        field.onChange(dayjs(date).toISOString())
                      }
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: Boolean(error),
                          size: item.size,
                        },
                      }}
                    />

                    {Boolean(error) && (
                      <FormHelperText error id={item.id}>
                        {error?.message}
                      </FormHelperText>
                    )}
                  </>
                );
              }}
            />
          </Grid>
        );
      } else if (item.type === "date-time-picker-fixedTime") {
        return (
          <Grid
            item
            key={item.id}
            xs={12 / itemColumn["xs"]}
            sm={12 / itemColumn["sm"]}
            md={12 / itemColumn["md"]}
            lg={12 / itemColumn["lg"]}
          >
            <InputLabel sx={{ display: "flex", alignItems: "center" }}>
              {item.label}
              {item.required && (
                <span style={{ color: "red", marginLeft: "4px" }}>*</span>
              )}
            </InputLabel>
            <Controller
              key={item.id}
              name={item.name}
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <>
                    <DatePicker
                      inputRef={field.ref}
                      minutesStep={item.minutesStep || 0}
                      format={item.dateFormat || "MMMM DD, YYYY h:mm A"}
                      value={dayjs(field.value)
                        .hour(item.hour)
                        .minute(item.minutes)}
                      onChange={(date) => {
                        const updatedDate = dayjs(date)
                          .hour(item.hour)
                          .minute(item.minutes);
                        field.onChange(updatedDate);
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: Boolean(error),
                          size: item.size,
                        },
                      }}
                    />

                    {Boolean(error) && (
                      <FormHelperText error id={item.id}>
                        {error?.message}
                      </FormHelperText>
                    )}
                  </>
                );
              }}
            />
          </Grid>
        );
      } else if (item.type === "multiple-select") {
        return (
          <Grid
            key={item.id}
            item
            xs={12 / itemColumn["xs"]}
            sm={12 / itemColumn["sm"]}
            md={12 / itemColumn["md"]}
            lg={12 / itemColumn["lg"]}
          >
            <Stack direction="row" alignItems="center" justifyContent="start">
              <InputLabel sx={{ display: "flex", alignItems: "center" }}>
                {item.label}
                {item.required && (
                  <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                )}
              </InputLabel>
            </Stack>
            <Controller
              key={item.id}
              name={item.name}
              control={control}
              defaultValue=""
              render={({ field, fieldState: { error } }) => {
                return (
                  <>
                    <Autocomplete
                      id={item.id}
                      multiple
                      fullWidth
                      autoHighlight
                      size={item.size}
                      disableCloseOnSelect
                      disabled={item.disabled}
                      options={item.options}
                      onChange={
                        item.extraOnchange
                          ? (...onChangeData) =>
                              item.extraOnchange([...onChangeData], field)
                          : (_event, data) => {
                              if (data) {
                                field.onChange(
                                  data.map((option) => option.value)
                                );
                              } else {
                                field.onChange([]);
                              }
                            }
                      }
                      value={
                        field.value
                          ? item.options?.filter((option) =>
                              field.value.includes(option.value)
                            )
                          : []
                      }
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder={item.placeholder}
                          error={Boolean(error)}
                          helperText={error?.message}
                        />
                      )}
                      renderTags={(value, getTagProps) => {
                        return value.map((option, index) => {
                          return (
                            <Chip
                              key={index}
                              {...getTagProps({ index })}
                              variant="filled"
                              color={error ? "error" : "default"}
                              label={
                                <Typography variant="caption" color="black">
                                  {option.label}
                                </Typography>
                              }
                              deleteIcon={
                                <CloseOutlined
                                  style={{ fontSize: "0.875rem" }}
                                />
                              }
                              size="small"
                            />
                          );
                        });
                      }}
                    />
                    {/* //Suggestion Chips */}
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{
                        mt: 1.5,
                        flexWrap: { xs: "wrap", sm: "inherit" },
                        gap: { xs: 1, sm: 0 },
                      }}
                    ></Stack>
                  </>
                );
              }}
            />
          </Grid>
        );
      } else if (item.type === "single-checkbox") {
        return (
          <Grid
            item
            key={item.id}
            xs={12 / itemColumn["xs"]}
            sm={12 / itemColumn["sm"]}
            md={12 / itemColumn["md"]}
            lg={12 / itemColumn["lg"]}
          >
            <InputLabel sx={{ display: "flex", alignItems: "center" }}>
              {item.label}
              {item.required && (
                <span style={{ color: "red", marginLeft: "4px" }}>*</span>
              )}
            </InputLabel>
            <Controller
              key={item.id}
              name={item.name}
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <>
                    <Stack
                      {...field}
                      direction={item.direction}
                      component={FormGroup}
                      onChange={({ target: { checked, value } }) => {
                        // item.extraOnchange(checked, value);

                        return item.extraOnchange
                          ? item.extraOnchange(checked, value)
                          : field.onChange(checked);
                      }}
                    >
                      <FormControlLabel
                        key={field.value}
                        value={field.value}
                        control={<Checkbox size={item.size} />}
                        label={item.label}
                        disabled={item.disabled}
                        labelPlacement="end"
                        checked={field.value}
                      />
                    </Stack>
                    {Boolean(error) && (
                      <FormHelperText error id={item.id}>
                        {error?.message}
                      </FormHelperText>
                    )}
                  </>
                );
              }}
            />
          </Grid>
        );
      }
    }
  });
  return data;
};

InputField.propTypes = {
  formData: PropTypes.array,
  control: PropTypes.object,
  column: PropTypes.object,
  children: PropTypes.node,
  commonInputTypes: PropTypes.array,
};

export default InputField;

/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function useFormHook({ validationSchema, defaultValuesProp }) {
  const [defaultValues, setDefaultValue] = useState(defaultValuesProp);

  const {
    control,
    handleSubmit,
    reset,
    formState,
    setError,
    watch,
    setFocus,
    setValue,
    getValues,
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValuesProp);
    setDefaultValue(defaultValuesProp);
  }, [defaultValuesProp]);

  return {
    control,
    handleSubmit,
    reset,
    formState,
    setError,
    watch,
    setFocus,
    setValue,
    getValues,
  };
}

export default useFormHook;

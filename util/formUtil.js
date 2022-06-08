import { Controller } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Tooltip,
  Button,
} from "@chakra-ui/react";
import Icon from "./Icon";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

/**
 *This function creates validation message to be used in FormHookFormController component
 * This msg is created based on errors and validation rules
 * @param {*} { inputName, validationRules, errors }
 * @return {*} String
 */

function createValidationMsg({ inputName, validationRules, errors }) {
  const { required, minLength, maxLength, pattern, validate } = validationRules;
  const errrorType = errors?.[inputName]?.type;
  const msg = errors?.[inputName]?.message;

  return `
  ${required && errrorType === "required" ? `* Required Field` : ""} 
  ${
    minLength && errrorType === "minLength"
      ? `* Min Length - ${validationRules.minLength}`
      : ""
  } ${
    maxLength && errrorType === "maxLength"
      ? `* Max Length - ${validationRules.maxLength}`
      : ""
  } ${
    (pattern && errrorType === "pattern") ||
    (validate && errrorType === "validate")
      ? msg || `* Invalid characters / pattern`
      : ""
  }
  
  `;
}

/**
 * This is a bootstrap input component encapsulated by React hook form Controller
 * Controller component enables react form hook functionality on bootstrap input component
 * @export
 * @param {*} {
 *   control,
 *   inputName - {string} Name of the output variable should be in camelcase,
 *   inputLabel - {String} Input label ,
 *   inputType = "text",
 *   errors,
 *   validationRules,
 * }
 * @return {*} Component
 */

export function FormHookFormController({
  control,
  inputName,
  inputLabel,
  inputType = "text",
  errors,
  validationRules,
  defaultValue,
  helpText,
  isDisabled,
  addTopMarginOnLevel = true,
  showInRow = true,
}) {
  const validationMsg = createValidationMsg({
    inputName,
    validationRules,
    errors,
  });

  //  console.log(errors);
  return (
    <Controller
      rules={validationRules}
      name={inputName}
      control={control}
      render={({ field }) => {
        return (
          <>
            <FormControl marginBottom="10px" id={inputName} {...field}>
              <div className={`flex w-full ${showInRow ? "" : "flex-col"}`}>
                <div
                  className={`${
                    addTopMarginOnLevel ? "mt-2" : ""
                  } w-1/3 capitalize `}
                >
                  <FormLabel>
                    {inputLabel}{" "}
                    {validationRules?.required && (
                      <span className="text-red-500 mt-[5px] text-[14px]">
                        *
                      </span>
                    )}
                  </FormLabel>
                </div>
                <div className="w-2/3">
                  <div className="flex">
                    <Input
                      {...field}
                      isDisabled={isDisabled}
                      defaultValue={defaultValue}
                      isInvalid={errors?.[inputName]}
                      type={inputType}
                    />
                    {helpText && (
                      <Tooltip label={helpText} fontSize="md">
                        <Button className="mt-1" size="sm" variant="ghost">
                          <Icon name={faInfo}></Icon>
                        </Button>
                      </Tooltip>
                    )}
                  </div>
                  {errors?.[inputName] && (
                    <FormHelperText color="red">{validationMsg}</FormHelperText>
                  )}
                </div>
              </div>
            </FormControl>
          </>
        );
      }}
    />
  );
}

/**
 * This is a bootstrap input component encapsulated by React hook form Controller
 * Controller component enables react form hook functionality on bootstrap input component
 * @export
 * @param {*} {
 *   control,
 *   inputName - {string} Name of the output variable should be in camelcase,
 *   inputLabel - {String} Input label ,
 *   inputType = "text",
 *   errors,
 *   validationRules,
 * }
 * @return {*} Component
 */

export function FormHookFormControllerControlled({
  control,
  inputName,
  inputLabel,
  inputType = "text",
  errors,
  validationRules,
  value,
  helpText,
  isDisabled,
  addTopMarginOnLevel = true,
  showInRow = true,
  onChange,
}) {
  const validationMsg = createValidationMsg({
    inputName,
    validationRules,
    errors,
  });

  //  console.log(errors);
  return (
    <Controller
      rules={validationRules}
      name={inputName}
      control={control}
      render={({ field }) => {
        return (
          <>
            <FormControl marginBottom="10px" id={inputName} {...field}>
              <div className={`flex w-full ${showInRow ? "" : "flex-col"}`}>
                <div
                  className={`${addTopMarginOnLevel ? "mt-2" : ""} ${
                    showInRow ? "w-1/3" : "w-full"
                  } capitalize `}
                >
                  <FormLabel>
                    {inputLabel}{" "}
                    {validationRules?.required && (
                      <span className="text-red-500 mt-[5px] text-[14px]">
                        *
                      </span>
                    )}
                  </FormLabel>
                </div>
                <div className="w-2/3">
                  <div className="flex">
                    <Input
                      style={{ background: "white", height: 35 }}
                      {...field}
                      isDisabled={isDisabled}
                      value={value}
                      isInvalid={errors?.[inputName]}
                      type={inputType}
                      onChange={onChange}
                    />
                    {helpText && (
                      <Tooltip label={helpText} fontSize="md">
                        <Button className="mt-1" size="sm" variant="ghost">
                          <Icon name={faInfo}></Icon>
                        </Button>
                      </Tooltip>
                    )}
                  </div>
                  {errors?.[inputName] && (
                    <FormHelperText color="red">{validationMsg}</FormHelperText>
                  )}
                </div>
              </div>
            </FormControl>
          </>
        );
      }}
    />
  );
}

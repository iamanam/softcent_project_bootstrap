import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormHookFormController } from "util/formUtil";
import { Button, useToast } from "@chakra-ui/react";
import Axios from "axios";

export default function AddBrandForm({
  changePageContent,
  editableParnerData,
}) {
  const toast = useToast();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    setDefaultValues();
  }, []);

  const setDefaultValues = () => {
    if (editableParnerData) {
      // set default value
      setValue("location", editableParnerData.location);
      setValue("offerPercent", editableParnerData.offerPercent);
      setValue("name", editableParnerData.name);
      setValue("id", editableParnerData.id);
      //  console.log("id is", editableParnerData);
    }
  };

  const onSubmit = async (data) => {
    // return console.log(data);
    const res = await Axios.post("/api/partner-manage/partner", {
      data,
    });

    if (res.data.ok) {
      toast({
        title: "Partner created.",
        description: `Partner is being successfully created!`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      changePageContent();
    }
  };

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
      {editableParnerData?.id && (
        <FormHookFormController
          isDisabled
          control={control}
          inputLabel="Partner ID"
          inputName="id"
          defaultValue={editableParnerData?.id}
          errors={errors}
          validationRules={{ required: false }}
        />
      )}

      <FormHookFormController
        control={control}
        inputName="name"
        inputLabel="Partner Name"
        errors={errors}
        defaultValue={editableParnerData?.name}
        validationRules={{ required: true, maxLength: 100, minLength: 1 }}
      />

      <FormHookFormController
        control={control}
        inputLabel="Location"
        inputName="location"
        defaultValue={editableParnerData?.location}
        errors={errors}
        validationRules={{ required: true, maxLength: 100, minLength: 1 }}
      />

      <FormHookFormController
        control={control}
        inputLabel="Offer percent"
        inputName="offerPercent"
        defaultValue={editableParnerData?.offerPercent}
        errors={errors}
        validationRules={{ required: true, maxLength: 100, minLength: 1 }}
      />

      <div className="flex justify-center mt-6">
        <Button
          type="submit"
          variant="solid"
          colorScheme="black"
          _hover={{ background: "#4f4e4e" }}
        >
          Submit
        </Button>

        <Button
          className="ml-2"
          variant="solid"
          onClick={changePageContent}
          colorScheme="gray"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

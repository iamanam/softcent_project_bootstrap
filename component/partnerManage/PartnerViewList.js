import { useEffect, useState } from "react";
import { Spinner, useToast } from "@chakra-ui/react";
import Icon from "util/Icon";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { delPartner } from "pages/api/partner-manage/apihelper.partner";
import Axios from "axios";

const Item = ({ value, editHandler, deleteHandler }) => (
  <li className="bg-gray-100 h-16 justify-center items-center flex mb-1">
    <p className="w-2/3 pl-2 capitalize"> {value.name}</p>
    <div className="flex justify-end w-1/3 pr-2">
      <button onClick={() => editHandler(value)}>
        <Icon name={faEdit} />
      </button>
      <button className="ml-2" onClick={() => deleteHandler(value)}>
        <Icon name={faTrash} />
      </button>
    </div>
  </li>
);

function RenderPartners({ items, editHandler, deleteHandler }) {
  return (
    <ul>
      {items.map((value, index) => (
        <Item
          key={`item-${value.created}`}
          index={index}
          value={value}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
        />
      ))}
    </ul>
  );
}

export default function PartnerViewList({
  partner,
  getPartnerQuery,
  setEditablePartner,
}) {
  const { isLoading, isError, data, error, refetch } = getPartnerQuery;
  const [partnerItems, setPartnerItems] = useState(isLoading ? partner : data);
  const toast = useToast();

  // console.log(partnerItems);

  useEffect(() => {
    //  console.log("setting partner items useeffect");
    setPartnerItems(data);
  }, [data]);

  const updatePartner = async (partners) => {
    // return console.log(data);
    const res = await Axios.post("/api/partner-manage/partner", {
      data: partners, // we will send data object as array
    });

    if (res.data.ok) {
      toast({
        title: "partner created.",
        description: `${
          res.data?.result?.filter((item) => item === true).length
        } partner is being successfully created!`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }

    //  console.log(data, res);
  };

  const editHandler = (data) => {
    setEditablePartner(data);
    // console.log(data);
  };

  const deleteHandler = async (data) => {
    const res = await delPartner(data.id);
    if (res.ok) {
      refetch();
      toast({
        title: "partner deleted.",
        description: `Delete operation in successful`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
    // console.log(data, res);
  };

  return (
    <>
      <style jsx>{``}</style>
      <div className="flex items-start w-full">
        <div className="w-full">
          {isLoading && (
            <div className="flex w-full justify-center items-center">
              <Spinner color="red.500" />
            </div>
          )}

          {isError && (
            <h2 className="text-red-500 text-xl uppercase text-center">
              {error.message}
            </h2>
          )}

          {!isError &&
            !isLoading &&
            (!Array.isArray(partnerItems) || partnerItems?.length === 0) && (
              <div className="flex flex-col">
                <h2 className="text-xl font-bold uppercase text-center text-gray-500 p-3">
                  No partner was added!!
                </h2>
              </div>
            )}

          {partnerItems?.length > 0 && partnerItems && (
            <RenderPartners
              editHandler={editHandler}
              deleteHandler={deleteHandler}
              items={partnerItems}
            />
          )}
        </div>
      </div>
    </>
  );
}

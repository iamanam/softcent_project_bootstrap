import { faPlus, faSync, faSort } from "@fortawesome/free-solid-svg-icons";
import PartnerViewList from "component/partnerManage/PartnerViewList";
import SettingWrapper from "component/SettingWrapper";
import { useState } from "react";
import AddPartner from "component/partnerManage/AddPartner";
import Layout from "component/Layout";

import { useQuery } from "react-query";
import { fetchpartner } from "pages/api/partner-manage/apihelper.partner";
import { getpartner } from "pages/api/partner-manage/fn.partner";

// button title of add brand which is reused in 2 instances, title of two instance need
// to be same to work some functionality, so we saved in variable

const ADD_PARTNER_TITLE = "Add";

export async function getStaticProps(context) {
  const partner = await getpartner({ sendRowResult: true });
  return {
    props: {
      partner,
    },
  };
}

export default function PartnerManage(props) {
  const { partner } = props;
  const [titleOfactiveSettingBtn, setTitleOfActiveSettingBtn] = useState(null);
  const [mainSettingContentType, setMainSettingsContentType] =
    useState("PartnerList");

  const [editableParnerData, setEditableParnerData] = useState(null);
  const [editablePartnerId, setEditablePartnerId] = useState(null);

  const getPartnerQuery = useQuery("getpartner", fetchpartner);

  const changePageContent = async () => {
    setMainSettingsContentType(
      mainSettingContentType === "PartnerAdd" ? "PartnerList" : "PartnerAdd"
    );
    // for content type brand list we will refetch list items
    if (mainSettingContentType === "PartnerAdd") {
      await getPartnerQuery.refetch();
      setTitleOfActiveSettingBtn(null);
    } else {
      // as we are adding/editing brand set the title for it
      setTitleOfActiveSettingBtn(ADD_PARTNER_TITLE);
    }
  };

  async function Refreshpartner() {
    await getPartnerQuery.refetch();
  }

  function setEditablePartner(data) {
    setEditableParnerData(data);
    setEditablePartnerId(data?.id);
    changePageContent();
  }

  const Content = {
    PartnerAdd: (
      <AddPartner
        changePageContent={changePageContent}
        editableParnerData={editableParnerData}
      />
    ),
    PartnerList: (
      <PartnerViewList
        partner={partner}
        getPartnerQuery={getPartnerQuery}
        setEditablePartner={setEditablePartner}
      />
    ),
  };

  // console.log(editableBrandId);

  return (
    <>
      <style jsx>{``}</style>
      <Layout breadCrumb={[{ title: "Partner Manage", url: "#" }]}>
        <SettingWrapper
          headingTitle="Manage partner"
          buttons={[
            {
              title: ADD_PARTNER_TITLE,
              onClickHandler: () => {
                setEditableParnerData(null);
                setEditablePartnerId(null);
                changePageContent();
              },
              btnIcon: faPlus,
              enableButtonToggle: true,
            },
            {
              title: "Refresh",
              onClickHandler: Refreshpartner,
              btnIcon: faSync,
              enableButtonToggle: false,
            },
          ]}
          titleOfactiveSettingBtn={titleOfactiveSettingBtn}
          setTitleOfActiveSettingBtn={setTitleOfActiveSettingBtn}
        >
          <div className="flex w-full mt-4">
            {Content[mainSettingContentType]}
          </div>
        </SettingWrapper>
      </Layout>
    </>
  );
}

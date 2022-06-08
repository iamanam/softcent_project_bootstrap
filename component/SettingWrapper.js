import Icon from "../util/Icon";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

/**
 *
 * This component is used to reuse same type settings
 * This format can be used in device manage, category manage, brand manage
 * @export
 * @param {*} { children, buttons, headingTitle }
 * @return {*}
 */

export default function SettingWrapper({
  children,
  headingTitle,
  buttons,
  titleOfactiveSettingBtn,
  setTitleOfActiveSettingBtn,
}) {
  return (
    <>
      <style jsx>{`
        .top-head {
          height: 50px;
          max-height: 50px;
        }
        .main-contents {
          height: calc(100vh - var(--header-height) - 50px);
          background: #f5f5f557;
          overflow-y: auto;
        }
      `}</style>

      <div className="flex w-full justify-center">
        <div className="flex flex-col w-6/12">
          <div className="top-head flex items-center w-full border-b-2 border-black justify-between">
            <h1 className="text-2xl mt-2 mb-2 mr-3">{headingTitle}</h1>

            <div className="flex">
              {buttons?.map((btn) => {
                const btnProps = {
                  ...btn,
                  ...{ titleOfactiveSettingBtn, setTitleOfActiveSettingBtn },
                };
                return (
                  <RenderSettingBtn
                    key={btn.title}
                    {...btnProps}
                  ></RenderSettingBtn>
                );
              })}
            </div>
          </div>
          <div className="main-contents p-3 flex w-full">{children}</div>
        </div>
      </div>
    </>
  );
}

function RenderSettingBtn({
  title,
  onClickHandler,
  btnIcon,
  enableButtonToggle,
  titleOfactiveSettingBtn,
  setTitleOfActiveSettingBtn,
}) {
  const btnTitle = titleOfactiveSettingBtn === title ? "Cancel" : title;

  return (
    <Button
      className="mr-1"
      key={title}
      variant={titleOfactiveSettingBtn === title ? "solid" : "outline"}
      colorScheme="black"
      size="sm"
      onClick={() => {
        if (enableButtonToggle) setTitleOfActiveSettingBtn(btnTitle);
        onClickHandler();
      }}
      rightIcon={
        <Icon name={titleOfactiveSettingBtn === title ? faTimes : btnIcon} />
      }
    >
      {btnTitle}
    </Button>
  );
}

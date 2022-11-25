import React, { useRef } from "react";
import LoadComponent from "@/components/LoadComponents";
import { Button } from 'antd'
import Form from '@/components/Form'
import Validator from '@/components/Form/validator'
import CutImg from '@/components/CutImg'

const component = {
  url: "http://localhost:3002/remoteEntry.js",
  scope: "RemoteHome",
  module: "Home",
  moduleProps: { value: 1 }
}

const Index = (props) => {
  const formRef: React.RefObject<Form> = useRef(null)
  const cutImgRef: React.RefObject<{ show: Function, hide: Function }> = useRef(null)
  const layout = [7, 16]
  const model = [
    {
      type: "input",
      name: "input",
      label: "input",
      value: "",
      layout,
      placeholder: "请输入",
      addonAfter: <span>12342</span>,
      validator: Validator.require("请输入正确值")
    },
    {
      type: "password",
      name: "password",
      label: "password",
      value: "",
      layout,
      placeholder: "请输入",
      addonAfter: <span>12342</span>,
      validator: Validator.require("请输入正确值")
    },
    {
      type: "number",
      name: "number",
      label: "number",
      value: "",
      layout,
      placeholder: "请输入",
      addonAfter: <span>12342</span>,
      validator: Validator.require("请输入正确值")
    },
    {
      type: "textarea",
      name: "textarea",
      label: "textarea",
      layout,
      value: "",
      placeholder: "请输入",
      validator: Validator.require("请输入正确值")
    },
    {
      type: "select",
      name: "selectSingle",
      label: "selectSingle",
      value: "",
      layout,
      placeholder: "请选择",
      options: [{ label: 123, value: 123 }, { label: 456, value: 456 }],
      validator: Validator.require("请选择")
    },
    {
      type: "select",
      name: "selectMultiple",
      label: "selectMultiple",
      layout,
      options: [{ label: 123, value: 123 }, { label: 456, value: 456 }],
      mode: "multiple",
      placeholder: "请输入",
      validator: Validator.require("请选择")
    },
    {
      type: "select",
      name: "selectTags",
      label: "selectTags",
      layout,
      options: [{ label: 123, value: "123" }, { label: 456, value: "456" }],
      mode: "tags",
      placeholder: "请输入",
      validator: Validator.require("请选择")
    },
    {
      type: "radio",
      name: "radio",
      label: "radio",
      layout,
      options: [{ label: 123, value: "123" }, { label: 456, value: "456" }],
      validator: Validator.require("请选择")
    },
    {
      type: "checkbox",
      name: "checkbox",
      label: "checkbox",
      layout,
      options: [{ label: 123, value: "123" }, { label: 456, value: "456" }],
      validator: Validator.require("请选择")
    },
    {
      type: "label",
      name: "label",
      label: "label",
      value: 1523453,
      layout,
      render: (val: any) => val
    },
    {
      type: "uploadImg",
      name: "uploadImg",
      label: "uploadImg",
      value: ["https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png", "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"],
      layout,
      validator: Validator.require("请选择")
    },
  ]

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        cutImgRef?.current?.show(reader?.result);
      };
    }
  };

  return <div>
    <div>
      <Form model={model} ref={formRef} />
      <Button type="primary" onClick={() => {
        let data = formRef.current?.getData()
        console.log(data)
      }}>click</Button>
    </div>
    <LoadComponent {...component} />
    <input type='file' accept="image/*" onChange={onSelectFile} />
    <CutImg locked ref={cutImgRef} handleCut={(v) => { console.log(v, "45r") }} />
  </div>
}

export default Index
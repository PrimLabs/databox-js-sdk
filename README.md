## databox_js_sdk

databox & metabox

## Get Start

### Install

`npm install crypto-js`

`npm install string-random`

`npm install js-databox`

### Example

```js
const plug_agent = await window.ic.plug.agent
const agent = plug_agent
const metaboxApi = new MetaBox(agent)
const res = await metaboxApi.createDataBox({
  is_private: true,
  box_name: "isp_test",
  box_type: {'data_box': null}
})
const boxes = await metaboxApi.getBoxes(await agent.getPrincipal())
console.log(boxes)
const dataBoxCai = boxes[2].canister_id.toString()
const dataBoxApi = new DataBox(dataBoxCai, agent)
console.log(await dataBoxApi.get_all_files_info())
console.log(await dataBoxApi.canisterState())
const keyArr = await dataBoxApi.put_plain_files(acceptedFiles, true)
const blob = await dataBoxApi.get_plain_file(keyArr[0])
console.log(blob)
console.log(await dataBoxApi.delete_ic_plain_file(keyArr[0]))
console.log(await dataBoxApi.clear_box())
```

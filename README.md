<img src="./src/icon.svg" width="100" /><br>
# Clipping Mask <br>
A Clipping mask addon for Construct 3 <br>
<br>
Author: reddog, skymen <br>
<sub>Made using [c3ide2-framework](https://github.com/ConstructFund/c3ide2-framework) </sub><br>

## Table of Contents
- [Usage](#usage)
- [Examples Files](#examples-files)
- [Properties](#properties)
- [Actions](#actions)
- [Conditions](#conditions)
- [Expressions](#expressions)
---
## Usage
To build the addon, run the following commands:

```
npm i
node ./build.js
```

To run the dev server, run

```
npm i
node ./dev.js
```

The build uses the pluginConfig file to generate everything else.
The main files you may want to look at would be instance.js and scriptInterface.js

## Examples Files

---
## Properties
| Property Name | Description | Type |
| --- | --- | --- |
| Start Clipping | Enable to start clipping. To prevent rendering issues, you need a second mask with this to off to stop clipping at a higher Z index. | check |
| Visible | Enable to make the mask visible. When invisible, the mask will not clip. | check |
| Origin X | X Coordinate (0-1) | float |
| Origin Y | Y Coordinate (0-1) | float |


---
## Actions
| Action | Description | Params
| --- | --- | --- |
| Start clipping | Set whether to start clipping or end clipping | Is Start             *(boolean)* <br> |


---
## Conditions
| Condition | Description | Params
| --- | --- | --- |
| Is Clipping | Check if clipping is enabled |  |


---
## Expressions
| Expression | Description | Return Type | Params
| --- | --- | --- | --- |

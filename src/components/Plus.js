import React from "react";

const PlusIcon = (props) => {
    return (
        <span onClick={props.onAdd} style={{marginLeft: "1rem", cursor: "pointer"}}>
            <svg xmlns="http://www.w3.org/2000/svg"  height="16px" width="16px" viewBox="0 0 448 512"><path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/></svg>
        </span>
    )
}

export default PlusIcon;
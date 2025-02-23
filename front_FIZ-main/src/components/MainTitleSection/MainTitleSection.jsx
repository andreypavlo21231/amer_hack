import React from "react";

function MainTitleSection({title}){
    return (
        <div className="main__inner">
            <div className="main__commencement">
                <h2 className="main__title">{title}</h2>
            </div>
            <div className="main__commencement--under-line"></div>
        </div>
    );
};

export default MainTitleSection;
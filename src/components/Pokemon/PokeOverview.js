import React, { useState } from "react";

import pokeball_black from "../../assets/img/pokeball-black.png";

const PokeOverview = ({sword_text, shield_text, default_text}) => {
    const [version, setVersion] = useState('sword');
    return (
        <>
            {sword_text === "" && shield_text === "" ? (
                <h3  className="text-center text-md-left overview">
                    {default_text}
                </h3>
            ) : (
                <>
                    <h3 className="text-center text-md-left overview">
                        {version === "sword" ? sword_text : shield_text}
                    </h3>

                    <div className="container-versions d-flex justify-content-center justify-content-md-start mt-4">
                        <button  
                          className={`${version === "sword" && version} mr-2`}
                          onClick={() => setVersion("sword")}>
                              <img src={pokeball_black} alt="pokeball icon" />
                        </button>
                        <button  
                          className={`${version === "shield" && version} mr-2`}
                          onClick={() => setVersion("shield")}>
                              <img src={pokeball_black} alt="pokeball icon" />
                        </button>
                    </div>
                </>
            )}
        </>
    )
}

export default PokeOverview;
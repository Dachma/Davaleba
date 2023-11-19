import { useEffect, useState } from "react";
import "./styles/app.css";

function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.vendoo.ge/api/beta/catalog?url=technics%2Ftelefonebi%2Fmobiluri-telefonebi&sort=popular&sortDir=desc&page=1&limit=20`
      );
      const dataJson = await response.json();
      setData(dataJson.products);
    };
    fetchData();
  }, []);

  const renderInput = () => {
    return (
      <label>
        <input
          className="input"
          type="text"
          placeholder="Search Phone"
          onChange={(e) => setInput(e.target.value)}
        />
      </label>
    );
  };

  const renderProducts = () => {
    return (
      <div className="container">
        {data?.map((el) => {
          if (
            el.original_price !== el.final_price &&
            el.name.toLowerCase().includes(input.toLowerCase())
          ) {
            return (
              <div className="product-container" key={el.id}>
                <img
                  className="img"
                  alt={el.name}
                  src={el.thumb_img.files.file}
                />
                <div className="prices">
                  <div className="final-price">{el.final_price}₾</div>
                  <div className="original-price">{el.original_price}₾</div>
                  <div className="discount">
                    -
                    {Math.ceil(
                      100 - (el.final_price * 100) / el.original_price
                    )}
                    %
                  </div>
                </div>
                <div>{el.name}</div>
              </div>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div>
      {renderInput()}
      {renderProducts()}
    </div>
  );
}

export default App;


export default function PopupSearchBox() {
  return (
    <>
  <div className="popup-search-box d-none d-lg-block  ">
    <button className="searchClose"><i className="fal fa-times"></i></button>
    <form action="#">
      <input type="text" className="border-theme" placeholder="What are you looking for"/>
      <button type="submit"><i className="fal fa-search"></i></button>
    </form>
  </div>
  </>
      );
}

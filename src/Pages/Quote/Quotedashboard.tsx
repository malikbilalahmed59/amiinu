import { CiSearch } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { IoFilterOutline } from "react-icons/io5";
import { LuShip } from "react-icons/lu";
import { SlPlane } from "react-icons/sl";
import { TiMessages } from "react-icons/ti";
import "./quotedashboard.css";
import { useRequestList } from "../../Hooks/useRequestList";
import { Loader } from "rsuite";

const QuoteDashboard = () => {
  const { data, isLoading } = useRequestList();

  return (
    <>
      <div className="main">
        <div className="container">
          <div className="topsection-main">
            <div className="top-section">
              <div className="left-section">
                <div className="search-bar d-flex">
                  <span className="span">
                    My quotes ({data && data.length})
                  </span>
                  <form className="d-flex formlabel">
                    <input
                      className="form-control me-2 searchinput"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <CiSearch size={"25px"} />
                  </form>
                </div>
              </div>
              <div className="right-section">
                <button className="quote-report">Quote Report</button>
                <button className="quote-report">New quote </button>
              </div>
            </div>
          </div>
          <div className="filtercard-parent">
            <div className="filter-card">
              <div className="first-card">
                <SlPlane /> Air
              </div>
              <div className="first-card">
                <SlPlane /> Sea Air
              </div>
              <div className="first-card">
                <LuShip /> FCL
              </div>
              <div className="first-card">
                <LuShip /> LCL
              </div>

              <div className="firstfilter-card">
                <IoFilterOutline />
                Filter
              </div>
            </div>
          </div>
          {isLoading && <Loader></Loader>}
          {!isLoading && data && data.length === 0 && <p>No Requests.</p>}
          {data?.map((item) => (
            <div className="bottom-cards mb-3" key={item.id}>
              <div className="quoteref-card">
                <div className="ref-top">
                  <div className="top-left">
                    <div className="topleft-left">
                      <LuShip color="blue" />
                      <div>
                        <span className="quote-ref">Quote ref.</span> <br />
                        <span className="quote-id">QUO-00146332</span>
                      </div>
                    </div>
                    <div className="topleft-rigt">
                      <button className="cancel">cancelled</button>
                    </div>
                  </div>
                  <div className="top-middle">
                    <div className="top-middleleft">
                      <div className="china">
                        <span className="china-text">Cargo Ready Date</span>
                      </div>
                      <div className="musafa">
                        <span className="china-text">19 May 2024</span>
                      </div>
                    </div>
                    <div className="top-middlemiddle">
                      <div className="china">
                        <span className="cargo">CHINA, TEXAS (USZHO)</span>
                      </div>
                      <div className="musafa">
                        <span className="cargo-date">MUSAFA (AEFMZ)</span>
                      </div>
                    </div>
                    <div className="top-middlemiddle">
                      <div className="china">
                        <span className="cargo">To Be Booked Before</span>
                      </div>
                      <div className="musafa">
                        <span className="cargo-date">2 Jun 2024</span>
                      </div>
                    </div>
                  </div>

                  <div className="top-right">
                    <span className="budget">20354 USD</span>
                  </div>
                </div>
                <hr className="hr-line" />
                <div className="ref-bootom">
                  <div className="bottom-left">
                    <div className="topleft-left">
                      <div>
                        <span
                          className="quote-ref"
                          style={{
                            color: "#315CD6",
                            fontFamily: "sans-serif",
                            fontSize: "14px",
                            fontWeight: "700",
                          }}
                        >
                          Cargo details
                        </span>{" "}
                        <FaRegEye color="#315CD6    " size={"15px"} />
                      </div>
                    </div>
                    <div className="topleft-left">
                      <div>
                        <span className="quote-ref">Service Level</span> <br />
                        <span className="quote-id">standard</span>
                      </div>
                    </div>
                    <div className="topleft-left">
                      <div>
                        <span className="quote-ref">My Reference</span> <br />
                        <span className="quote-id">dcd</span>
                      </div>
                    </div>
                    <div className="topleft-left">
                      <div>
                        <span className="quote-ref">Shipment Type</span> <br />
                        <span className="quote-id">FCL</span>
                      </div>
                    </div>
                  </div>

                  <div className="bottom-right">
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Other Action
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <a className="dropdown-item" href="#">
                            Send Order
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Copy Request
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Contact Us
                          </a>
                        </li>
                      </ul>
                    </div>
                    <button className="copy-request">
                      {" "}
                      <FaRegCopy />
                      Copy Request
                    </button>
                    <button className="copy-request">
                      {" "}
                      <TiMessages />
                      Contavt us
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuoteDashboard;

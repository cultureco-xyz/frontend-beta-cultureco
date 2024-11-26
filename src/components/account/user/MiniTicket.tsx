import { IProductData } from "@/types";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

function MiniTicket({
  post,
  creatorName,
}: {
  post: IProductData;
  creatorName: string;
}) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = new Date(`${post.createdAt}`).getDay();
  const month = months[new Date(`${post.createdAt}`).getMonth()];
  const year = new Date(`${post.createdAt}`).getFullYear();
  const m = new Date(`${post.createdAt}`).getMonth();
  const hour = new Date(`${post.createdAt}`).getHours();
  const min = new Date(`${post.createdAt}`).getMinutes();

  const [openView, setopenView] = useState(false);
  function closeTicket() {
    setopenView(false);
  }

  return (
    <>
      <div
        onClick={() => {
          setopenView(true);
        }}
        className="flex w-full items-center "
      >
        <span className="relative ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="88"
            fill="none"
            viewBox="0 0 120 88"
          >
            <g clipPath="url(#clip0_3418_52101)">
              <path
                fill="#FE621D"
                fillRule="evenodd"
                d="M49.088 0H8a8 8 0 00-8 8v72a8 8 0 008 8h104a8 8 0 008-8V8a8 8 0 00-8-8H70.912C69.016 4.131 64.843 7 60 7c-4.843 0-9.016-2.869-10.912-7z"
                clipRule="evenodd"
              ></path>
              <path
                fill="#AF3800"
                d="M8.906 11V6.772h1.585c1.257 0 1.99.768 1.99 2.092v.006c0 1.354-.724 2.13-1.99 2.13H8.906zm.756-.636h.73c.84 0 1.318-.533 1.318-1.482v-.006c0-.929-.49-1.468-1.318-1.468h-.73v2.956zm3.173.636l1.5-4.228h.852l1.5 4.228h-.79l-.355-1.093h-1.565L13.627 11h-.791zm1.901-3.442l-.568 1.766h1.187l-.569-1.766h-.05zM17.997 11V7.408h-1.3v-.636h3.36v.636h-1.304V11h-.756zm2.85 0V6.772h2.737v.636h-1.98v1.146h1.872v.6h-1.872v1.21h1.98V11h-2.736zM98.831 11V7.408h-1.3v-.636h3.36v.636h-1.304V11h-.756zm2.851 0V6.772h.756V11h-.756zm1.798 0V6.772h.868l1.271 3.252h.05l1.269-3.252h.867V11h-.68V7.994h-.053L105.9 11h-.515l-1.172-3.006h-.05V11h-.683zm5.368 0V6.772h2.736v.636h-1.98v1.146h1.872v.6h-1.872v1.21h1.98V11h-2.736zM8.695 41v-5.637h3.649v.848h-2.64v1.527h2.495v.801H9.703v1.613h2.64V41H8.696zm6.43 0l-1.95-5.637h1.11l1.395 4.473h.066l1.395-4.473h1.113L16.304 41h-1.179zm4.102 0v-5.637h3.648v.848h-2.64v1.527h2.495v.801h-2.496v1.613h2.641V41h-3.648zm4.898 0v-5.637H25l2.77 3.883h.062v-3.883h.969V41h-.871l-2.77-3.883h-.062V41h-.973zm7.473 0v-4.79h-1.735v-.847h4.48v.848h-1.738V41h-1.007zM8.521 70v-4.228h.756v3.592h1.94V70H8.52zm5.192.106c-1.24 0-2.001-.859-2.001-2.218v-.006c0-1.363.773-2.215 2-2.215 1.231 0 1.999.852 1.999 2.215v.006c0 1.36-.765 2.218-1.998 2.218zm0-.654c.753 0 1.227-.615 1.227-1.564v-.006c0-.955-.477-1.562-1.227-1.562-.75 0-1.23.607-1.23 1.562v.006c0 .949.468 1.564 1.23 1.564zm4.629.654c-1.198 0-1.943-.85-1.943-2.215v-.006c0-1.371.742-2.218 1.94-2.218.96 0 1.69.61 1.79 1.474v.023h-.741l-.003-.012c-.109-.5-.513-.832-1.046-.832-.718 0-1.166.6-1.166 1.562v.006c0 .964.448 1.564 1.169 1.564.536 0 .934-.299 1.043-.764l.003-.015h.74v.02c-.11.847-.81 1.413-1.786 1.413zM20.53 70l1.5-4.228h.853l1.5 4.228h-.791l-.355-1.093h-1.564L21.32 70h-.79zm1.902-3.442l-.569 1.766h1.187l-.569-1.766h-.05zM25.692 70v-3.592h-1.3v-.636h3.36v.636h-1.304V70h-.756zm2.851 0v-4.228h.756V70h-.756zm3.621.106c-1.24 0-2-.859-2-2.218v-.006c0-1.363.772-2.215 2-2.215 1.23 0 1.998.852 1.998 2.215v.006c0 1.36-.764 2.218-1.998 2.218zm0-.654c.753 0 1.228-.615 1.228-1.564v-.006c0-.955-.478-1.562-1.228-1.562s-1.23.607-1.23 1.562v.006c0 .949.468 1.564 1.23 1.564zM35.03 70v-4.228h.656l2.078 2.913h.047v-2.913h.726V70h-.653l-2.077-2.912h-.047V70h-.73zM52.285 70.106c-1.198 0-1.942-.85-1.942-2.215v-.006c0-1.371.741-2.218 1.94-2.218.96 0 1.69.61 1.79 1.474v.023h-.742l-.003-.012c-.108-.5-.513-.832-1.046-.832-.717 0-1.166.6-1.166 1.562v.006c0 .964.449 1.564 1.17 1.564.535 0 .934-.299 1.042-.764l.003-.015h.741v.02c-.111.847-.811 1.413-1.787 1.413zM54.916 70v-4.228h.756v1.758h2.056v-1.758h.753V70h-.753v-1.834h-2.056V70h-.756zm4.611 0v-4.228h2.737v.636h-1.98v1.146h1.871v.6h-1.872v1.21h1.98V70h-2.736zm5.438.106c-1.198 0-1.943-.85-1.943-2.215v-.006c0-1.371.742-2.218 1.94-2.218.96 0 1.69.61 1.79 1.474v.023h-.741l-.003-.012c-.109-.5-.513-.832-1.046-.832-.718 0-1.166.6-1.166 1.562v.006c0 .964.448 1.564 1.169 1.564.536 0 .934-.299 1.043-.764l.003-.015h.741v.02c-.111.847-.812 1.413-1.787 1.413zm2.63-.106v-4.228h.757v1.955h.05l1.666-1.955h.868l-1.594 1.843L71.062 70h-.923l-1.336-1.884-.451.525V70h-.756zm3.572-1.784v-.662h1.957v.662h-1.957zM74.111 70v-4.228h.756V70h-.756zm1.8 0v-4.228h.655l2.078 2.913h.046v-2.913h.727V70h-.653l-2.078-2.912h-.046V70h-.73zM91.573 70v-3.592h-1.3v-.636h3.36v.636h-1.304V70h-.756zm4.02 0v-1.667l-1.483-2.56h.826l1.008 1.813h.05l1.008-1.814h.826l-1.482 2.561V70h-.753zm2.968 0v-4.228h1.687c.858 0 1.439.566 1.439 1.413v.005c0 .844-.581 1.413-1.439 1.413h-.932V70h-.755zm1.502-3.61h-.747v1.603h.747c.542 0 .859-.293.859-.8v-.005c0-.507-.317-.797-.859-.797zm2.458 3.61v-4.228h2.737v.636h-1.981v1.146h1.872v.6h-1.872v1.21h1.981V70h-2.737z"
              ></path>
              <mask id="path-14-inside-1_3418_52101" fill="#fff">
                <path
                  fillRule="evenodd"
                  d="M49.088 0H8a8 8 0 00-8 8v72a8 8 0 008 8h104a8 8 0 008-8V8a8 8 0 00-8-8H70.912C69.016 4.131 64.843 7 60 7c-4.843 0-9.016-2.869-10.912-7z"
                  clipRule="evenodd"
                ></path>
              </mask>
              <path
                fill="#000"
                fillOpacity="0.16"
                d="M49.088 0l.909-.417L49.729-1h-.64v1zm21.824 0v-1h-.641l-.268.583.909.417zM8 1h41.088v-2H8v2zM1 8a7 7 0 017-7v-2a9 9 0 00-9 9h2zm0 72V8h-2v72h2zm7 7a7 7 0 01-7-7h-2a9 9 0 009 9v-2zm104 0H8v2h104v-2zm7-7a7 7 0 01-7 7v2a9 9 0 009-9h-2zm0-72v72h2V8h-2zm-7-7a7 7 0 017 7h2a9 9 0 00-9-9v2zM70.912 1H112v-2H70.912v2zm-.909-1.417A11.002 11.002 0 0160 6v2c5.248 0 9.768-3.11 11.82-7.583l-1.817-.834zM60 6A11.002 11.002 0 0149.997-.417l-1.818.834C50.232 4.89 54.752 8 60 8V6z"
                mask="url(#path-14-inside-1_3418_52101)"
              ></path>
              <path
                stroke="#CB5C50"
                strokeDasharray="2 2"
                d="M0 28.5L120 28.5"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_3418_52101">
                <path fill="#fff" d="M0 0H120V88H0z"></path>
              </clipPath>
            </defs>
          </svg>
          <div className="absolute flex flex-col h-full top-0 left-0 w-full text-[#2E2F32] ">
            <span className="flex justify-between w-full text-[5px] px-2 mt-[12px]">
              <span className="flex gap-[2px]">
                <p>{day}</p>
                <p>{month}</p>
              </span>
              <p>
                {hour}:{min}
              </p>
            </span>
            <span className="text-[10px] px-2 mt-6">{post.title}</span>
            <span className="text-[6px] flex w-full justify-between px-2 mt-3">
              <p>Zo House</p>
              <p>08:00</p>
              <p>Tribe M</p>
            </span>
          </div>
        </span>
        <div className="flex justify-between items-center w-full border-b-[1px] border-[#ffffff21] mx-4 px-0">
          <div className="font-groteskRegular ml-2 text-white">
            <h1 className="text-base font-fredokaSemiBold">{post.title}</h1>
            <p className="text-[14px]">{post.productType}</p>
            <p className="text-[14px]">Zo House, Bengaluru</p>
            <p className="text-[14px]">
              {day} {month} {year}
            </p>
          </div>
          <span className="ml-auto">
            <ChevronRight className="text-white" />
          </span>
        </div>
      </div>
      <>
        {openView && (
          <div
            key={openView + post._id}
            className="z-50 fixed top-0 left-0 right-0 bottom-0 justify-center items-center flex w-full h-svh bg-[#00000040]"
          >
            <div className="relative z-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="365"
                height="582"
                fill="none"
                viewBox="0 0 365 582"
              >
                <path
                  fill="#FE621D"
                  fillRule="evenodd"
                  d="M0 8a8 8 0 018-8h349a8 8 0 018 8v342.242c-9.434.252-17 7.603-17 16.636 0 9.032 7.566 16.383 17 16.635V574a8 8 0 01-8 8H8a8 8 0 01-8-8V383.513c9.434-.252 17-7.603 17-16.635 0-9.033-7.566-16.384-17-16.636V8z"
                  clipRule="evenodd"
                ></path>
                <g fill="#2E2F32" clipPath="url(#clip0_3207_84332)">
                  <path d="M78.625 397H16v62.625h62.625V397zm-10.438 52.188h-41.75v-41.75h41.75v41.75z"></path>
                  <path d="M36.875 417.875H57.75v20.875H36.875v-20.875zM16 564h62.625v-62.625H16V564zm10.438-52.188h41.75v41.75h-41.75v-41.75z"></path>
                  <path d="M36.875 522.25H57.75v20.875H36.875V522.25zm83.5-125.25v62.625H183V397h-62.625zm52.187 52.188h-41.75v-41.75h41.75v41.75z"></path>
                  <path d="M141.25 417.875h20.875v20.875H141.25v-20.875zM36.875 470.062H16v20.876h31.313V480.5H36.874v-10.438zm52.188 20.876h20.875v20.874H89.062v-20.874zm-41.75-20.876h20.874V480.5H47.314v-10.438zm62.625 52.188H89.062v10.438H99.5v10.437h10.438V522.25zm-31.313-52.188V480.5H68.187v10.438h20.876v-20.876H78.624zM99.5 438.75h10.438v20.875H99.5V438.75zm10.438 41.75v10.438h20.874v-20.876H99.5V480.5h10.438zm-20.876-20.875H99.5v10.437H89.062v-10.437zm20.876 83.5h20.874V564h-20.874v-20.875zm-20.876 0H99.5V564H89.062v-20.875zm20.876-31.313h10.437v10.438h-10.437v-10.438zm0-83.5v-20.874H99.5V397H89.062v41.75H99.5v-10.438h10.438zm31.312 114.813h10.438V564H141.25v-20.875zm0-20.875h20.875v10.438H141.25V522.25zm-10.438 10.438h10.438v10.437h-10.438v-10.437zm-10.437-10.438h10.437v10.438h-10.437V522.25zm41.75-20.875v10.437h10.437v10.438H183v-20.875h-20.875zm10.437 31.313h-10.437V564H183v-20.875h-10.438v-10.437zm-52.187-31.313v10.437h31.313v-20.874h-20.876v10.437h-10.437zm20.875-31.313V480.5h20.875v10.438H183v-20.876h-41.75z"></path>
                </g>
                <path
                  stroke="#AF3800"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M52 363h262"
                ></path>
                <mask id="path-9-inside-1_3207_84332" fill="#fff">
                  <path d="M6 18h355v49H6V18z"></path>
                </mask>
                <path
                  fill="#2E2F32"
                  d="M361 66H6v2h355v-2z"
                  mask="url(#path-9-inside-1_3207_84332)"
                ></path>
                <rect
                  width="152"
                  height="114"
                  x="199"
                  y="449"
                  fill="#FE621D"
                  rx="7"
                ></rect>
                <rect
                  width="152"
                  height="114"
                  x="199"
                  y="449"
                  stroke="#2E2F32"
                  strokeWidth="2"
                  rx="7"
                ></rect>
                <path
                  fill="#2E2F32"
                  d="M301.388 488.388c1.538-1.216 1.815-3.467.439-4.864a31.926 31.926 0 00-13.786-8.243 31.874 31.874 0 00-19.454.501 31.942 31.942 0 00-15.551 11.724 32.047 32.047 0 00.112 37.146 31.944 31.944 0 0015.621 11.629 31.872 31.872 0 0019.457.383 31.92 31.92 0 0013.736-8.326c1.367-1.405 1.077-3.655-.469-4.861-1.545-1.206-3.758-.906-5.169.456a24.842 24.842 0 01-10.126 5.92 24.79 24.79 0 01-15.135-.299 24.843 24.843 0 01-12.151-9.045 24.921 24.921 0 01-4.656-14.434 24.92 24.92 0 014.569-14.461 24.837 24.837 0 0112.096-9.119 24.788 24.788 0 0115.133-.39 24.826 24.826 0 0110.161 5.858c1.42 1.353 3.635 1.64 5.173.425z"
                ></path>
                <path
                  fill="#2E2F32"
                  d="M279.092 509.895a3.89 3.89 0 01-3.887-3.895 3.89 3.89 0 013.887-3.895 3.89 3.89 0 013.887 3.895 3.89 3.89 0 01-3.887 3.895z"
                ></path>
                <path
                  fill="#2E2F32"
                  fillRule="evenodd"
                  d="M279.098 519.037c7.185 0 13.01-5.837 13.01-13.037 0-7.2-5.825-13.037-13.01-13.037s-13.01 5.837-13.01 13.037c0 7.2 5.825 13.037 13.01 13.037zm-.006-3.556c5.226 0 9.462-4.245 9.462-9.481 0-5.237-4.236-9.482-9.462-9.482s-9.462 4.245-9.462 9.482c0 5.236 4.236 9.481 9.462 9.481z"
                  clipRule="evenodd"
                ></path>
                <path
                  fill="#2E2F32"
                  d="M293.37 494.407c1.025-.81 1.21-2.311.293-3.243a21.256 21.256 0 00-22.16-5.161 21.294 21.294 0 00-10.368 7.816 21.359 21.359 0 00-3.915 12.394 21.36 21.36 0 003.99 12.37 21.287 21.287 0 0010.414 7.752 21.244 21.244 0 0012.971.256 21.279 21.279 0 009.158-5.55c.911-.937.718-2.437-.313-3.241-1.03-.804-2.505-.604-3.446.304a16.559 16.559 0 01-6.751 3.946 16.52 16.52 0 01-10.09-.199 16.562 16.562 0 01-8.101-6.03 16.619 16.619 0 01-3.103-9.622 16.615 16.615 0 013.045-9.641 16.57 16.57 0 018.065-6.08 16.53 16.53 0 0116.863 3.646c.946.902 2.422 1.093 3.448.283z"
                ></path>
                <rect
                  width="27"
                  height="27"
                  x="282.5"
                  y="22.5"
                  stroke="#2E2F32"
                  rx="3.5"
                ></rect>
                <path
                  fill="#2E2F32"
                  d="M296 40l-5-5 1.4-1.45 2.6 2.6V28h2v8.15l2.6-2.6L301 35l-5 5zm-8 4v-5h2v3h12v-3h2v5h-16z"
                ></path>
                <rect
                  width="27"
                  height="27"
                  x="319.5"
                  y="22.5"
                  stroke="#2E2F32"
                  rx="3.5"
                ></rect>
                <g clipPath="url(#clip1_3207_84332)">
                  <path
                    fill="#2E2F32"
                    d="M327.246 44L325 41.754l5.774-5.774L325 30.246 327.246 28l5.774 5.774L338.754 28 341 30.246l-5.774 5.734L341 41.754 338.754 44l-5.734-5.774L327.246 44z"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_3207_84332">
                    <rect
                      width="167"
                      height="167"
                      x="16"
                      y="397"
                      fill="#fff"
                      rx="8"
                    ></rect>
                  </clipPath>
                  <clipPath id="clip1_3207_84332">
                    <path
                      fill="#fff"
                      d="M0 0H16V16H0z"
                      transform="translate(325 28)"
                    ></path>
                  </clipPath>
                </defs>
              </svg>
              <div className="font-groteskBold p-4 px-6 py-[12px] absolute top-0 left-0 w-full h-full text-[#2E2F32]">
                <button
                  onClick={() => {
                    closeTicket();
                  }}
                  className="absolute right-0 bg-red-500 w-12 h-12 opacity-0"
                >
                  Close
                </button>
                <h1 className="text-[32px]">
                  {post.title.length < 15
                    ? post.title
                    : post.title.slice(0, 12) + "..."}
                </h1>
                <div className="flex justify-between text-2xl items-center mt-8">
                  <p>{creatorName}</p>
                </div>
                <span className="flex justify-between items-center mt-4">
                  <p className="font-groteskBold text-[40px]">
                    {day}.{m + 1}.{year}
                  </p>
                  <span className="flex flex-col">
                    <h1 className="">3:00 pm</h1>
                    <p className="text-xs font-groteskLight leading-3">
                      onwards
                    </p>
                  </span>
                </span>
                <span className="text-center w-[60%] mx-auto flex mt-3">
                  <p>Zo house, Koramangala Bangalore.</p>
                </span>
                <span className="flex justify-center flex-col items-center mt-2 text-2xl">
                  <h1>Vaibhav Kumar +1</h1>
                  <p>Tribe Member</p>
                </span>
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
}

export default MiniTicket;

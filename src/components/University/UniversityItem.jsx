import React from 'react';
import Image from '../shared/Image/Image';
import inGeltLogo from '../../assets/images/logo.png';

const HeartSVG = ({ fill }) => {
    return (
        <svg
            className="w-5"
            viewBox="0 0 24 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_1467_2485)">
                <path
                    d="M9.23404 16.9946L11.7165 18.7486L11.7178 18.7496C11.8436 18.8389 11.9785 18.8791 12.104 18.8791C12.2155 18.8791 12.339 18.8447 12.4482 18.7748L12.4554 18.7702L13.595 18.0616C15.9704 16.5784 18.1359 14.7369 20.0257 12.5975C20.7516 11.7778 21.3257 10.8454 21.7467 9.82631C21.7861 9.72583 21.826 9.62704 21.867 9.53258C22.1653 8.76574 22.3203 7.94834 22.3203 7.10492V7.05823C22.3146 6.2269 22.1581 5.42275 21.8632 4.66669C21.57 3.92087 21.1461 3.25533 20.6127 2.67567C20.0757 2.10661 19.4522 1.65842 18.7645 1.34008C18.0396 1.01662 17.2852 0.850274 16.5025 0.850274C15.7185 0.850274 14.9632 1.01688 14.2455 1.34074C13.6146 1.62544 13.0378 2.03048 12.529 2.53941L12.1015 2.96697L11.6765 2.53687C11.1754 2.02964 10.6002 1.62556 9.96872 1.34081C9.25183 1.01757 8.48992 0.850274 7.70499 0.850274C6.92732 0.850274 6.16636 1.01679 5.44941 1.34013C4.75675 1.65702 4.13306 2.1063 3.59515 2.67586C3.06295 3.25371 2.64479 3.91899 2.35128 4.66741L2.35003 4.67059C2.04399 5.43813 1.8877 6.25769 1.8877 7.10488C1.8877 7.95174 2.04437 8.77113 2.34982 9.53982L2.35034 9.54112C2.82676 10.7482 3.51188 11.8095 4.39306 12.7157L5.13362 13.4792M9.23404 16.9946C9.23373 16.9945 9.23434 16.9949 9.23404 16.9946ZM9.23404 16.9946C7.77562 15.9559 6.3931 14.7746 5.13362 13.4792M5.13362 13.4792C5.13352 13.4792 5.1337 13.4794 5.13362 13.4792Z"
                    stroke="currentColor"
                    strokeWidth="1.20192"
                    fill={!fill ? 'transparent' : 'currentColor'}
                />
            </g>
            <defs>
                <clipPath id="clip0_1467_2485">
                    <rect
                        width="22.8365"
                        height="19.2308"
                        fill="white"
                        transform="translate(0.685547 0.248047)"
                    />
                </clipPath>
            </defs>
        </svg>

    );
}

const UniversityItem = ({ RightArrowSVG, university, shortlistHandler }) => {

    const { courseName, courseDuration, logo, name, yearlyFee, ranking, address, studentShortlists } = university;

    return (
        <div className="p-4 bg-white border-8 flex flex-col rounded-3xl shadow border-[#E2E7EE] mt-4 justify-between">
            {/* 1st Div */}
            <div className="">
                <h6 className="mb-2 text-lg !text-[#00285A] font-bold tracking-tight text-gray-900 dark:text-white">
                    {courseName}
                </h6>
            </div>

            {/* 2nd Div */}
            <div className="flex justify-between">
                <p className="bg-[#E7ECF3] text-[#0C3C82] py-2 px-3 rounded-full inline-flex text-sm gap-x-2 items-center font-medium">
                    <svg
                        width={24}
                        height={18}
                        viewBox="0 0 24 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11.9721 7.76668C12.1524 7.82936 12.3449 7.88083 12.535 7.92981C12.5664 7.9379 12.5977 7.94591 12.629 7.95389C12.7884 7.99469 12.9449 8.03475 13.095 8.08002C13.5896 8.22887 14.002 8.43457 14.2899 8.72547C14.5743 9.01285 14.7443 9.39043 14.7443 9.90204C14.7443 10.433 14.6059 10.8425 14.3785 11.1527C14.1507 11.4634 13.8275 11.6826 13.4448 11.8221C13.3687 11.8498 13.2882 11.8738 13.2056 11.8939L13.1152 11.9159L13.1139 12.009C13.1083 12.405 12.7956 12.7187 12.4189 12.7187C12.0387 12.7187 11.7238 12.3993 11.7238 11.9981V11.9846V11.8892L11.6309 11.8676C11.1744 11.7611 10.7423 11.5791 10.4015 11.3412C10.0825 11.1192 9.99632 10.6694 10.2131 10.3387C10.4288 10.0091 10.8597 9.92428 11.1754 10.1444C11.5918 10.434 12.2114 10.5954 12.7335 10.5222C12.88 10.5022 13.0341 10.4559 13.1537 10.3572C13.2783 10.2543 13.3543 10.1035 13.3543 9.90204C13.3543 9.75571 13.2429 9.68915 13.192 9.65879C13.1905 9.65785 13.1889 9.65695 13.1875 9.65608C13.0878 9.5967 12.9764 9.55297 12.8655 9.51513C12.6853 9.45292 12.4929 9.40147 12.3028 9.35238C12.2723 9.34451 12.2419 9.33671 12.2115 9.32893C12.0512 9.28779 11.8937 9.24738 11.7427 9.20183C11.2482 9.05298 10.8358 8.84727 10.5479 8.55638C10.2635 8.26899 10.0934 7.89139 10.0934 7.37977C10.0934 6.85752 10.2409 6.45268 10.4661 6.14016C10.7392 5.76095 11.1464 5.50269 11.6336 5.37749L11.7227 5.35458L11.7238 5.26257C11.7288 4.86582 12.0422 4.55144 12.4189 4.55144C12.799 4.55144 13.1139 4.87077 13.1139 5.27201V5.28125V5.37596L13.206 5.3981C13.6651 5.50852 14.1019 5.69942 14.4461 5.94709C14.7609 6.17407 14.8401 6.62541 14.6182 6.95344C14.3978 7.27835 13.9657 7.35629 13.6524 7.13088C13.2389 6.83322 12.6249 6.6745 12.1067 6.7488C11.9585 6.77024 11.8035 6.81906 11.6838 6.91994C11.5593 7.02486 11.4834 7.17736 11.4834 7.37977C11.4834 7.52614 11.5949 7.5927 11.6457 7.62308C11.6473 7.62401 11.6488 7.6249 11.6502 7.62577C11.7498 7.68513 11.8613 7.72886 11.9721 7.76668ZM6.58464 2.89381L6.62995 2.8897L6.66118 2.85662C8.12275 1.30864 10.1632 0.347656 12.4189 0.347656C14.7428 0.347656 16.8387 1.36741 18.3067 2.99828L18.3322 3.0266L18.3693 3.03506C21.4211 3.73026 23.7116 6.541 23.7116 9.90204C23.7116 13.7866 20.6544 16.9342 16.8968 16.9342C16.1616 16.9342 15.4531 16.8136 14.7894 16.5907L14.7527 16.5783L14.7157 16.5897C13.9886 16.8141 13.217 16.9342 12.4189 16.9342C10.6053 16.9342 8.93053 16.3126 7.58429 15.2646L7.54793 15.2362L7.50196 15.2395C7.37465 15.2485 7.24544 15.2527 7.11426 15.2527C3.80672 15.2527 1.11548 12.4817 1.11548 9.06129C1.11548 5.82523 3.52428 3.17131 6.58464 2.89381ZM20.0346 5.34234L19.696 5.09446L19.852 5.48401C20.2418 6.45702 20.4565 7.52307 20.4565 8.64091C20.4565 11.344 19.2008 13.745 17.2598 15.2597L16.9414 15.508L17.3438 15.4741C20.1322 15.2391 22.3216 12.8297 22.3216 9.90204C22.3216 8.02175 21.4191 6.35581 20.0346 5.34234ZM5.20829 4.97498L5.36348 4.65073L5.04448 4.81642C3.53844 5.59865 2.50551 7.2076 2.50551 9.06129C2.50551 11.1734 3.8467 12.9676 5.70196 13.5835L6.03939 13.6955L5.83913 13.4017C4.92065 12.0541 4.38121 10.4121 4.38121 8.64091C4.38121 7.32493 4.67949 6.07981 5.20829 4.97498ZM19.0664 8.64091C19.0664 4.86275 16.0911 1.78879 12.4189 1.78879C8.74658 1.78879 5.77126 4.86275 5.77126 8.64091C5.77126 12.4191 8.74658 15.4931 12.4189 15.4931C16.0911 15.4931 19.0664 12.4191 19.0664 8.64091Z"
                            fill="#0C3C82"
                        />
                        <path
                            d="M11.9721 7.76668C12.1524 7.82936 12.3449 7.88083 12.535 7.92981C12.5664 7.9379 12.5977 7.94591 12.629 7.95389C12.7884 7.99469 12.9449 8.03475 13.095 8.08002C13.5896 8.22887 14.002 8.43457 14.2899 8.72547C14.5743 9.01285 14.7443 9.39043 14.7443 9.90204C14.7443 10.433 14.6059 10.8425 14.3785 11.1527C14.1507 11.4634 13.8275 11.6826 13.4448 11.8221C13.3687 11.8498 13.2882 11.8738 13.2056 11.8939L13.1152 11.9159L13.1139 12.009C13.1083 12.405 12.7956 12.7187 12.4189 12.7187C12.0387 12.7187 11.7238 12.3993 11.7238 11.9981V11.9846V11.8892L11.6309 11.8676C11.1744 11.7611 10.7423 11.5791 10.4015 11.3412C10.0825 11.1192 9.99632 10.6694 10.2131 10.3387C10.4288 10.0091 10.8597 9.92428 11.1754 10.1444C11.5918 10.434 12.2114 10.5954 12.7335 10.5222C12.88 10.5022 13.0341 10.4559 13.1537 10.3572C13.2783 10.2543 13.3543 10.1035 13.3543 9.90204C13.3543 9.75571 13.2429 9.68915 13.192 9.65879C13.1905 9.65785 13.1889 9.65695 13.1875 9.65608C13.0878 9.5967 12.9764 9.55297 12.8655 9.51513C12.6853 9.45292 12.4929 9.40147 12.3028 9.35238C12.2723 9.34451 12.2419 9.33671 12.2115 9.32893C12.0512 9.28779 11.8937 9.24738 11.7427 9.20183C11.2482 9.05298 10.8358 8.84727 10.5479 8.55638C10.2635 8.26899 10.0934 7.89139 10.0934 7.37977C10.0934 6.85752 10.2409 6.45268 10.4661 6.14016C10.7392 5.76095 11.1464 5.50269 11.6336 5.37749L11.7227 5.35458L11.7238 5.26257C11.7288 4.86582 12.0422 4.55144 12.4189 4.55144C12.799 4.55144 13.1139 4.87077 13.1139 5.27201V5.28125V5.37596L13.206 5.3981C13.6651 5.50852 14.1019 5.69942 14.4461 5.94709C14.7609 6.17407 14.8401 6.62541 14.6182 6.95344C14.3978 7.27835 13.9657 7.35629 13.6524 7.13088C13.2389 6.83322 12.6249 6.6745 12.1067 6.7488C11.9585 6.77024 11.8035 6.81906 11.6838 6.91994C11.5593 7.02486 11.4834 7.17736 11.4834 7.37977C11.4834 7.52614 11.5949 7.5927 11.6457 7.62308C11.6473 7.62401 11.6488 7.6249 11.6502 7.62577C11.7498 7.68513 11.8613 7.72886 11.9721 7.76668ZM11.9721 7.76668C11.972 7.76664 11.9723 7.76673 11.9721 7.76668ZM11.9721 7.76668L12.0112 7.65303M6.58464 2.89381L6.62995 2.8897L6.66118 2.85662C8.12275 1.30864 10.1632 0.347656 12.4189 0.347656C14.7428 0.347656 16.8387 1.36741 18.3067 2.99828L18.3322 3.0266L18.3693 3.03506C21.4211 3.73026 23.7116 6.541 23.7116 9.90204C23.7116 13.7866 20.6544 16.9342 16.8968 16.9342C16.1616 16.9342 15.4531 16.8136 14.7894 16.5907L14.7527 16.5783L14.7157 16.5897C13.9886 16.8141 13.217 16.9342 12.4189 16.9342C10.6053 16.9342 8.93053 16.3126 7.58429 15.2646L7.54793 15.2362L7.50196 15.2395C7.37465 15.2485 7.24544 15.2527 7.11427 15.2527C3.80672 15.2527 1.11548 12.4817 1.11548 9.06129C1.11548 5.82523 3.52428 3.17131 6.58464 2.89381ZM20.0346 5.34234L19.696 5.09446L19.852 5.48401C20.2418 6.45702 20.4565 7.52307 20.4565 8.64091C20.4565 11.344 19.2008 13.745 17.2598 15.2597L16.9414 15.508L17.3438 15.4741C20.1322 15.2391 22.3216 12.8297 22.3216 9.90204C22.3216 8.02175 21.4191 6.35581 20.0346 5.34234ZM5.20829 4.97498L5.36348 4.65073L5.04448 4.81642C3.53844 5.59865 2.50551 7.2076 2.50551 9.06129C2.50551 11.1734 3.8467 12.9676 5.70196 13.5835L6.03939 13.6955L5.83913 13.4017C4.92065 12.0541 4.38121 10.4121 4.38121 8.64091C4.38121 7.32493 4.67949 6.07981 5.20829 4.97498ZM19.0664 8.64091C19.0664 4.86275 16.0911 1.78879 12.4189 1.78879C8.74658 1.78879 5.77126 4.86275 5.77126 8.64091C5.77126 12.4191 8.74658 15.4931 12.4189 15.4931C16.0911 15.4931 19.0664 12.4191 19.0664 8.64091Z"
                            stroke="#F7EFFF"
                            strokeWidth="0.240385"
                        />
                    </svg>
                    {yearlyFee} USD / year
                </p>
                <p className="bg-[#E7ECF3] text-[#0C3C82] py-2 px-3 rounded-full inline-flex text-sm gap-x-2 items-center font-medium">
                    <svg
                        width={18}
                        height={18}
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11.5679 9.29435L9.80266 8.27553V4.55439C9.80266 4.33125 9.71402 4.11725 9.55624 3.95946C9.39845 3.80168 9.18445 3.71304 8.96132 3.71304C8.73818 3.71304 8.52418 3.80168 8.36639 3.95946C8.20861 4.11725 8.11997 4.33125 8.11997 4.55439V8.76112C8.11993 8.90883 8.15879 9.05395 8.23263 9.18189C8.30648 9.30982 8.41271 9.41605 8.54064 9.4899L10.7266 10.7519C10.8223 10.8072 10.928 10.8431 11.0375 10.8576C11.1471 10.8721 11.2585 10.8648 11.3653 10.8362C11.4721 10.8076 11.5722 10.7582 11.6599 10.691C11.7476 10.6237 11.8211 10.5398 11.8764 10.444C11.9317 10.3483 11.9675 10.2426 11.9819 10.133C11.9963 10.0234 11.989 9.91204 11.9604 9.80528C11.9317 9.69851 11.8823 9.59844 11.815 9.51077C11.7476 9.42311 11.6637 9.34956 11.5679 9.29435ZM8.96132 0.347656C7.29729 0.347656 5.67063 0.841097 4.28705 1.76558C2.90346 2.69006 1.82509 4.00407 1.18829 5.54142C0.551497 7.07878 0.384882 8.77045 0.709518 10.4025C1.03415 12.0346 1.83546 13.5337 3.0121 14.7103C4.18874 15.887 5.68788 16.6883 7.31993 17.0129C8.95198 17.3375 10.6436 17.1709 12.181 16.5341C13.7184 15.8973 15.0324 14.819 15.9569 13.4354C16.8813 12.0518 17.3748 10.4251 17.3748 8.76112C17.3723 6.53049 16.4851 4.39193 14.9078 2.81464C13.3305 1.23735 11.1919 0.350137 8.96132 0.347656ZM8.96132 15.4919C7.6301 15.4919 6.32877 15.0971 5.2219 14.3575C4.11503 13.618 3.25233 12.5668 2.7429 11.3369C2.23346 10.107 2.10017 8.75365 2.35988 7.44801C2.61959 6.14237 3.26063 4.94306 4.20194 4.00174C5.14326 3.06043 6.34257 2.41939 7.64821 2.15968C8.95385 1.89997 10.3072 2.03326 11.5371 2.5427C12.767 3.05213 13.8182 3.91483 14.5577 5.0217C15.2973 6.12857 15.6921 7.4299 15.6921 8.76112C15.69 10.5456 14.9803 12.2564 13.7184 13.5182C12.4566 14.7801 10.7458 15.4898 8.96132 15.4919Z"
                            fill="#0C3C82"
                        />
                    </svg>
                    {courseDuration} years
                </p>
            </div>

            {/* 3rd div */}
            <div className="flex my-2">
                <div className="w-3/5">
                    <p className="font-semibold">{address}</p>
                    <p className='text-sm flex items-center gap-x-1'>
                        Global Ranking |
                        <svg
                            width={15}
                            height={16}
                            viewBox="0 0 15 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_1467_2354)">
                                <path
                                    d="M7.4813 11.0595L11.1952 13.3011L10.2097 9.07632L13.4909 6.23377L9.17 5.86719L7.4813 1.88281L5.79259 5.86719L1.47168 6.23377L4.75293 9.07632L3.76735 13.3011L7.4813 11.0595Z"
                                    fill="#0C3C82"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_1467_2354">
                                    <rect
                                        width="14.4231"
                                        height="14.4231"
                                        fill="white"
                                        transform="translate(0.269775 0.681641)"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                        {ranking}
                    </p>
                </div>
                <div className="w-2/5 flex items-center m-auto gap-x-2">
                    <img src={inGeltLogo} alt="logo" className="h-8 w-auto m-auto" />
                    <p className="leading-4 text-sm m-auto font-medium">Apply with Ingelt Board</p>
                </div>
            </div>

            {/* 4th div */}
            <div className='mb-2'>
                <Image src={logo} alt={name} className={'h-auto w-11 rounded-md inline mb-1'} />
                <p className="pl-4 font-medium pr-3 text-[#0C3C82] inline">{name}</p>
            </div>

            {/* 5th div */}
            <div className="flex justify-between mu-3">
                <button className="hover:bg-[#0C3C82] bg-transparent duration-300 border-2 border-[#0C3C82] text-[#0C3C82] hover:text-white font-semibold py-2 px-4 max-md:text-sm rounded-full gap-x-2 flex items-center">
                    Talk to expert
                    <RightArrowSVG className={'h-5 w-5'} />
                </button>
                <button
                    onClick={(e) => shortlistHandler(e, university)}
                    className="bg-[#E7ECF3] hover:bg-[#0C3C82] duration-300 text-[#0C3C82] hover:text-[#E7ECF3] font-semibold py-2 px-4 max-md:text-sm rounded-full flex items-center gap-x-2">
                    Shortlist
                    <HeartSVG
                        fill={studentShortlists?.length > 0 ? true : false}
                    />
                </button>
            </div>
        </div>
    );
}

export default UniversityItem;

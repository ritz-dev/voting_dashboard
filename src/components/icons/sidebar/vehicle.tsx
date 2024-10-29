export const VehicleIcon: React.FC<React.SVGAttributes<{}>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props} viewBox="0 0 24 24">
      <g fill="currentColor" clipPath="url(#clip)">
        {/* Truck Bed */}
        {/* <path
          d="M2.25 8.75h12v7.5h-12v-7.5Z"
          opacity={0.2}
        /> */}
        {/* Truck Cab */}
        {/* <path d="M17.25 8.75h-2.25v7.5h5.5v-4l-3.25-3.5Z" opacity={0.2} /> */}
        <path d="M2.25 7.5A1.25 1.25 0 0 0 1 8.75v7.5A1.25 1.25 0 0 0 2.25 17.5h2.25a2.5 2.5 0 1 0 5 0h4.5a2.5 2.5 0 1 0 5 0h2.25A1.25 1.25 0 0 0 23 16.25v-5.25a1.25 1.25 0 0 0-.35-.88l-3.25-3.5A1.25 1.25 0 0 0 18 6.5h-2.25V7.5h2.25Zm1.25 10a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm12.5 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm1.5-7.5 2.8 3h-2.8v-3Z" fill="rgb(20 41 91)"/>
        {/* Truck Bed Details */}
        {/* <path d="M2.25 8.75v7.5h12v-7.5h-12Z" /> */}
      </g>
      <defs>
        <clipPath id="clip">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
  
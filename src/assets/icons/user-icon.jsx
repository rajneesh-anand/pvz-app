const UserIcon = ({ color, ...rest }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...rest}>
      <path
        d="M 12.072 14.798 C 15.767 14.798 18.785 11.632 18.785 7.733 C 18.785 3.809 15.767 0.644 12.072 0.644 C 8.377 0.644 5.357 3.809 5.357 7.709 C 5.357 11.632 8.377 14.798 12.072 14.798 Z M 12.072 2.737 C 14.668 2.737 16.789 4.961 16.789 7.709 C 16.789 10.454 14.668 12.679 12.072 12.679 C 9.475 12.679 7.354 10.454 7.354 7.709 C 7.354 4.961 9.475 2.737 12.072 2.737 Z M 15.191 15.479 C 14.867 15.373 14.492 15.452 14.243 15.688 L 12.072 17.625 L 9.899 15.688 C 9.625 15.452 9.275 15.373 8.952 15.479 C 7.552 15.95 0.589 18.462 0.589 22.098 C 0.589 22.674 1.038 23.144 1.586 23.144 L 22.556 23.144 C 23.103 23.144 23.553 22.674 23.553 22.098 C 23.553 18.462 16.59 15.95 15.191 15.479 Z M 3.11 21.052 C 4.208 19.822 6.853 18.462 9.051 17.677 L 11.422 19.796 C 11.797 20.136 12.345 20.136 12.72 19.796 L 15.091 17.677 C 17.289 18.487 19.934 19.849 21.033 21.052 L 3.11 21.052 Z"
        fill={color}
        stroke={color}
        strokeWidth="1"
      />
    </svg>
  );
};

export default UserIcon;
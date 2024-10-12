import * as React from "react";

function ForkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="8" height="16" viewBox="0 0 8 16" fill="none" {...props}>
      <path
        d="M7.2739 0C7.88136 0 8 0.635139 8 0.635139C8 2.06201 8 5.14375 8 6.58816C8 8.43219 5.82312 8.86063 5.82312 8.86063L5.8417 14.8124C5.8417 14.8124 5.82312 16 4.38092 16C2.93872 16 5.04842 16 3.64767 16C2.24692 16 2.22119 14.8124 2.22119 14.8124L2.20261 8.86063C2.20261 8.86063 0 8.44472 0 6.59442V0.607579C0 0.607579 0.0171523 0 0.726103 0C1.43505 0 1.44649 0.0212966 1.44649 0.607579C1.44649 1.19386 1.46936 4.90197 1.46936 4.90197C1.46936 4.90197 1.51938 5.46821 1.84956 5.46821C2.17974 5.46821 2.15401 4.90197 2.15401 4.90197C2.15401 4.90197 2.15401 1.21516 2.15401 0.607579C2.15401 0 2.16259 0 2.88869 0C3.61479 0 3.64767 0.0212966 3.64767 0.607579C3.64767 1.19386 3.64767 4.96461 3.64767 4.96461C3.64767 4.96461 3.6734 5.50955 4.00214 5.50955C4.33089 5.50955 4.36377 4.92327 4.36377 4.92327C4.36377 4.92327 4.36377 1.1876 4.36377 0.593799C4.36377 0 4.49098 0 5.1499 0C5.80883 0 5.85028 0.0350767 5.85028 0.580019C5.85028 1.12496 5.85028 4.85061 5.85028 4.85061C5.85028 4.85061 5.82455 5.53085 6.17902 5.53085C6.54636 5.53085 6.5678 4.88819 6.5678 4.88819C6.5678 4.88819 6.57352 1.24272 6.57352 0.621359C6.57352 0 6.66643 0 7.2739 0Z"
        fill="#EF7F4F"
      />
    </svg>
  );
}

const MemoForkIcon = React.memo(ForkIcon);
export default MemoForkIcon;
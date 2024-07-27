import classNames from 'classnames';
import { useExpandableSection } from 'features/common/expandableSection/hooks/useExpandableSection';

interface IExpandableSectionProps {
  defaultVisible?: boolean;
  sectionName: string;
  children: React.ReactNode;
}

export const ExpandableSection = ({
  defaultVisible = false,
  sectionName,
  children,
}: IExpandableSectionProps) => {
  const { isVisible, sectionAccent, toggleSection } = useExpandableSection({
    defaultVisible,
  });

  return (
    <div>
      <div className="border-b py-4 border-gray-200">
        <div
          onClick={toggleSection}
          className="flex justify-between items-center cursor-pointer"
        >
          <p className={classNames('text-base leading-4 text-gray-800', sectionAccent)}>
            {sectionName}
          </p>
          <button
            className="
            cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
            rounded
          "
            aria-label="show or hide"
          >
            <svg
              className={'transform ' + (isVisible ? 'rotate-180' : 'rotate-0')}
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 1L5 5L1 1"
                stroke="#4B5563"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div
          className={
            'pt-4 text-base leading-normal mt-4 text-gray-600 ' +
            (isVisible ? 'block' : 'hidden')
          }
          id="sect"
        >
          {isVisible && children}
        </div>
      </div>
    </div>
  );
};

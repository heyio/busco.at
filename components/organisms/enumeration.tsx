import { UI } from '../index';

export type EnumerationItem = {
  headline: string;
  content: string;
};

export type EnumerationProps = {
  content: EnumerationItem[];
};

function Enumeration({ content }: EnumerationProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white rounded-xl px-10 py-12 text-center">
      {content.map((enumeration: EnumerationItem, index: number) => (
        <div
          key={index}
          className={` px-4 ${
            index + 1 === 2 ? 'lg:border-x border-gray-300 px-6' : ''
          }`}
        >
          <UI.Typography size={'h4'} weight={'bold'}>
            {enumeration.headline}
          </UI.Typography>
          <UI.Typography size={'h5'} textColor={'gray'} className="mt-4">
            {enumeration.content}
          </UI.Typography>
          <UI.Typography size={'h3'} weight={'bold'} className="mt-4">
            {index + 1}
          </UI.Typography>
        </div>
      ))}
    </div>
  );
}

export default Enumeration;

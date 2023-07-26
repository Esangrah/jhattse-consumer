import { Navbar } from "@components";

interface Props {
  homeLink?: string;
}

export const Loader: React.FC<Props> = () => {

  return (
    <div className="h-sreeen w-full">
        <Navbar />
        <div className="flex shrink-0 flex-col">

        </div>
    </div>
  );
};

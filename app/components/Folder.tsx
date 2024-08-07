import { FC } from "react";

interface FileStrType {
  name: string;
  isFolder: Boolean;
  Children?: FileStrType[];
}

interface FolderStr {
  files: FileStrType[] | undefined;
}

const Folder: FC<FolderStr> = ({ files }) => {
  //   console.log(files);

  return (
    <div className="flex flex-col ">
      {files &&
        files.map((item, i) => (
          <span key={i} className=" -ml-4  text-sm">
            {item.name}
          </span>
        ))}
    </div>
  );
};
export default Folder;

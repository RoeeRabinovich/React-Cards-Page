import {
  Button,
  Table,
  Spinner,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from "flowbite-react";
import { TCard } from "../types/TCard";
import { TUser } from "../../store/userSlice";

interface ContentTableProps {
  mode: "cards" | "users";
  items: (TCard | TUser)[];
  onEdit: (item: TCard | TUser) => void;
  loading?: boolean;
}

export const ContentTable = ({
  mode,
  items,
  onEdit,
  loading,
}: ContentTableProps) => {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner size="xl" />
      </div>
    );
  }

  if (!items?.length) {
    return (
      <div className="py-8 text-center text-gray-500 dark:text-gray-400">
        No {mode} found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <Table striped>
        <TableHead>
          <TableHeadCell>{mode === "cards" ? "Title" : "Name"}</TableHeadCell>
          <TableHeadCell>Email</TableHeadCell>
          <TableHeadCell>
            {mode === "cards" ? "Phone" : "Business Status"}
          </TableHeadCell>
          <TableHeadCell>Actions</TableHeadCell>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item._id}>
              <TableCell>
                {mode === "cards"
                  ? (item as TCard).title
                  : `${(item as TUser).name.first} ${(item as TUser).name.last}`}
              </TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                {mode === "cards"
                  ? (item as TCard).phone
                  : (item as TUser).isBusiness
                    ? "Business"
                    : "Regular"}
              </TableCell>
              <TableCell>
                <Button size="sm" onClick={() => onEdit(item)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

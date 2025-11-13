import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { Skeleton } from "../ui/skeleton";

export default function SkeletonInformation() {
  return (
    <Table className="p-10">
      <TableBody>
        {[...Array(10)].map((_, index) => (
          <TableRow key={index}>
            <TableCell colSpan={3}>
              <Skeleton className="h-10 w-fulll" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
export interface IAdmin {
  id: number;
  name: string;
}

export interface IAdminsListProps {
  fetchAdmins: Function;
  admins: IAdmin[];
}

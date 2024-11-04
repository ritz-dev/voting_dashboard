import { NextPage } from "next";

export type NextPageWithLayout <P = {}> = NextPage<P> & {
    authorization?: boolean;
    getLayout?: (page: React.ReactElement) => React.ReactNode;
}

export enum SortOrder {
    Asc = 'asc',
    Desc = 'desc'
}

export interface Attachment {
    thumbnail: string;
    original: string;
    id: number;
    file_name: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    imageUrl: Attachment | null;
    role: string;
    isActive: boolean;
}

export interface Role {
    id:string;
    number?: string;
    name: string;
    description: string;
    permission: string[];
}

export interface candidates {

}

export interface Event {
    id:string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    candidate: candidate[];
    status: string;
}

export interface candidate {
    id: string;
    imageUrl: Attachment;
    name: string;
    user_id: string;
} 

export interface AuthResponse {
    token: string;
    permissions: string[];
    role: string;
}

export interface RoleInput {
    name: string;
    description: string | null;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface EventInput {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    candidate: string[];
    status: string;
}

export interface UserInput {
    name: string;
    email: string;
    password: string;
    imageUrl: Attachment | null;
    role: string;
    isActive: boolean
}

export interface Vote {
    candidate_id: string;
    event_id: string;
    user_id: string;
}

export interface VoteInput {
    candidate_id: string;
    event_id: string;
    user_id: string;
}

export interface Records{
    recid: string;//
    entry_datetime: Date;
    card_Id: string;
    license_num: string;//
    exit_datetime: string | null;
    payment: string;//
    vehicle_class: string;//
    operator_Id: string;
    parking_time: string;
    fee: number;
    fee2: number;
    charge: number;
    p_date: number;
    operator_id_exit: string;
    is_exit: boolean;
    section: number;
    entry_gate:string;
    exit_gate: string;
    is_cloud: boolean;
    exit_sec: number;
    updaterow: Date;
    terminal_id: string;   
}

export interface GetParams {
    slug: string;
}

export interface QueryOptions {
    language:string;
    limit?: number;
    page?: number;
    orderBy?: string;
    sortedBy?: SortOrder;
}

export interface  RoleQueryOptions extends Omit<QueryOptions, 'language'> {
    name: string;
    parent: number | null;
    is_active?: boolean;
}

export interface  EventQueryOptions extends Omit<QueryOptions, 'language'> {
    name: string;
    parent: number | null;
    is_active?: boolean;
}

export interface UserQueryOptions extends Omit<QueryOptions, 'language'> {
    name: string;
    search: string;
    is_active?: boolean;
}

export interface PaginatorInfo<T> {
    current_page:number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: any[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface MappedPaginatorInfo {
    currentPage: number;
    firstPageUrl: string;
    from: number;
    lastPage: number;
    lastPageUrl: string;
    links: any[];
    nextPageUrl: string | null;
    path: string;
    perPage: number;
    prevPageUrl: string | null;
    to: number;
    total: number;
    hasMorePages: boolean;
}

export interface RolePaginator extends PaginatorInfo<Role> {}

export interface EventPaginator extends PaginatorInfo<Event> {}

export interface UserPaginator extends PaginatorInfo<User> {}

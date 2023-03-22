import { Expose } from "class-transformer";
import { SelectQueryBuilder } from "typeorm";

// hold possible options for pagination
export interface PaginateOptions {
    // number of results to see
    limit :number;
    currentPage :number;
    total?: boolean;
}

// the <T> shows that it is a generic data type hence can be used by different classes/ can be re-used 
export class PaginationResult <T> {
    constructor (partial: Partial<PaginationResult <T>>){
        Object.assign(this, partial);
    }


    @Expose()
    first :number;

    @Expose()
    last: number;

    @Expose()
    limit :number;

    @Expose()
    total? :number;

    // the data that will be returned as a result
    @Expose()
    data : T[];
}


// function to perform the pagination
export async function paginate <T> (
    qb : SelectQueryBuilder <T>,

    options : PaginateOptions = {
        limit :10,
        currentPage : 1
    }
  // the returned promise   
): Promise <PaginationResult<T>>{
    //options limit how many items you want per page is
    // offset is the number of records you want to start from
    const offset = (options.currentPage - 1) * options.limit;
    const data = await qb.limit(options.limit).offset(offset).getMany();

    return new PaginationResult({
        first : offset + 1,
        last : offset + data.length,
        limit : options.limit,
        total : options.total ? await qb.getCount() : null,
        data
    })
}
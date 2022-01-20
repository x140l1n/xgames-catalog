import React from "react";
import Pagination from "react-bootstrap/Pagination";

interface MyPaginationProps {
    total_results: number;
    total_pages: number;
    current_page: number;
    search_value: string;
    page_clicked: (page: number, search_value: string) => void;
}

export default class MyPagination extends React.Component<MyPaginationProps> {
    render() {
        return (
            <Pagination className="justify-content-center p-5 flex-wrap w-100">
                {this.getPageArray().map((element: any, index: number, array: []) => {
                    const toReturn = [];

                    if (index === 0) {
                        toReturn.push(
                            <Pagination.First
                                key={"firstpage"}
                                onClick={
                                    this.props.current_page === 1
                                        ? () => { }
                                        : () => {
                                            this.props.page_clicked(1, this.props.search_value);
                                        }
                                }
                            />
                        );

                        toReturn.push(
                            <Pagination.Prev
                                key={"prevpage"}
                                onClick={
                                    this.props.current_page === 1
                                        ? () => { }
                                        : () => {
                                            this.props.page_clicked(this.props.current_page - 1, this.props.search_value);
                                        }
                                }
                            />
                        );
                    }

                    if (element === "")
                        toReturn.push(<Pagination.Ellipsis key={index} />);
                    else
                        toReturn.push(
                            <Pagination.Item
                                key={index}
                                active={this.props.current_page === element ? true : false}
                                onClick={
                                    this.props.current_page === element
                                        ? () => { }
                                        : () => {
                                            this.props.page_clicked(element, this.props.search_value);
                                        }
                                }
                            >
                                {element}
                            </Pagination.Item>
                        );

                    if (index === array.length - 1) {
                        toReturn.push(
                            <Pagination.Next
                                key={"nextpage"}
                                onClick={
                                    this.props.current_page === element
                                        ? () => { }
                                        : () => {
                                            this.props.page_clicked(this.props.current_page + 1, this.props.search_value);
                                        }
                                }
                            />
                        );

                        toReturn.push(
                            <Pagination.Last
                                key={"lastpage"}
                                onClick={
                                    this.props.current_page === element
                                        ? () => { }
                                        : () => {
                                            this.props.page_clicked(element, this.props.search_value);
                                        }
                                }
                            />
                        );
                    }

                    return toReturn;
                })}
            </Pagination>
        );
    }

    getPageArray() {
        let total_pages: number = this.props.total_pages;
        let current_page: number = this.props.current_page;
        let page_array: any = [];

        if (total_pages > 1) {
            if (total_pages <= 9) {
                var i = 1;

                while (i <= total_pages) {
                    page_array.push(i);
                    i++;
                }
            } else {
                if (current_page <= 5) page_array = [1, 2, 3, 4, 5, 6, 7, 8, "", total_pages];
                else if (total_pages - current_page <= 4)
                    page_array = [
                        1,
                        "",
                        total_pages - 7,
                        total_pages - 6,
                        total_pages - 5,
                        total_pages - 4,
                        total_pages - 3,
                        total_pages - 2,
                        total_pages - 1,
                        total_pages,
                    ];
                else
                    page_array = [
                        1,
                        "",
                        current_page - 3,
                        current_page - 2,
                        current_page - 1,
                        current_page,
                        current_page + 1,
                        current_page + 2,
                        current_page + 3,
                        "",
                        total_pages,
                    ];
            }
        }

        return page_array;
    }
}

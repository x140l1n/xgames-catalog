import React from 'react'
import Pagination from 'react-bootstrap/Pagination'

interface MyPaginationProps {
    total_results: number,
    total_pages: number,
    current_page: number,
    number_pages_show: number,
    page_clicked: (page: number) => void
}

export default class MyPagination extends React.Component<MyPaginationProps> {
    render() {
        return (
            <Pagination className="p-5 flex-wrap">
                <Pagination.First key="first_page" onClick={this.props.current_page === 1 ? () => {} : () => {this.props.page_clicked(1)}}/>
                <Pagination.Prev key="previous_page" onClick={this.props.current_page === 1 ? () => {} : () => {this.props.page_clicked(this.props.current_page - 1)}}/>
                {
                    this.render_items_pagination()
                }
                <Pagination.Next key="next_page" onClick={this.props.current_page === this.props.total_pages ? () => {} : () => {this.props.page_clicked(this.props.current_page + 1)}}/>
                <Pagination.Last key="last_page" onClick={this.props.current_page === this.props.total_pages ? () => {} : () => {this.props.page_clicked(this.props.total_pages)}}/>
            </Pagination>
        )
    }

    render_items_pagination() {
        let array_items: [] = [];

        for(let page = 1; page < this.props.total_pages; page++) {

        }
    }
}

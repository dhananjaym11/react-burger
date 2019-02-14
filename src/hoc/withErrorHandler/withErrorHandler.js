import React, { Component } from 'react';

import Modal from '../../Components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentDidMount() {
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })
            this.resInterceptors = axios.interceptors.response.use(
                res => res,
                err => {
                    this.setState({ error: err })
                }
            )
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        closeModal = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <>
                    <Modal showModal={this.state.error} closeModal={this.closeModal}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            )
        }
    }
}

export default withErrorHandler;
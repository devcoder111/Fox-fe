import APIService from '@/apiservice'
import moment from 'moment';

const API = new APIService()

export default {
    getAllTransactions(payload) {
        let headers = { 'Content-Type': 'application/json' };
        let url = '/transactions/filter'
        if (payload) {
            url += `?count=${payload.count}&page=${payload.page}`
            url += payload.SellerUserId ? `&SellerUserId=${payload.SellerUserId}` : ''
            url += payload.Invoiced === 'true' ? '&Invoiced=true' : (payload.Invoiced === 'false' ? '&Invoiced=false' : '')
            url += payload.StartDateChecked ? `&StartDate=${payload.StartDate}` : ''
            url += payload.EndDateChecked ? `&EndDate=${payload.EndDate}` : ''
            url += payload.InvoiceNo && payload.InvoiceNo.length > 0 ? `&InvoiceNo=${payload.InvoiceNo}` : ''
            url += payload.AdviceRef && payload.AdviceRef.length > 0 ? `&AdviceRef=${payload.AdviceRef}` : ''
        }
        return API.post(url, {}, headers);
    },
    getTransactionDetail (payload) {
        let headers = { 'Content-Type': 'application/json' };
        return API.get(`transactions/${payload.id}`, headers).then(res => {
          return res.data;
        }).catch(err => {
          throw err;
        });
    },
    updateTransaction (payload) {
        let headers = { 'Content-Type': 'application/json-patch+json' };
        return API.put(`transactions/${payload.id}`, payload, headers).then(res => {
            return res;
        }).catch(err => {
            throw err;
        });
    },
    deleteTransaction: (payload) => {
        return API.delete(`transactions/${payload.id}`).then(res => {
            return res;
        }).catch(err => {
            throw err;
        });
    },
    exportTransactionsToExcel: (payload) => {
        let headers = { 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' };
        let url = `transactions/export/excel`;
        if (payload) {
            url += `?count=${payload.count}&page=${payload.page}`
            url += payload.SellerUserId ? `&SellerUserId=${payload.SellerUserId}` : ''
            url += payload.Invoiced === 'true' ? '&Invoiced=true' : (payload.Invoiced === 'false' ? '&Invoiced=false' : '')
            url += payload.StartDateChecked ? `&StartDate=${payload.StartDate}` : ''
            url += payload.EndDateChecked ? `&EndDate=${payload.EndDate}` : ''
            url += payload.InvoiceNo && payload.InvoiceNo.length > 0 ? `&InvoiceNo=${payload.InvoiceNo}` : ''
            url += payload.AdviceRef && payload.AdviceRef.length > 0 ? `&AdviceRef=${payload.AdviceRef}` : ''
        }
        return API.get(url, headers, 'blob')
            .then(res => {
                let blob = new Blob([res]);
                let openUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = openUrl;
                var timestamp = moment().format('YYYY-MM-DD.hh:mm:ss');
                link.setAttribute('download', `transactions-${timestamp}.csv`); //or any other extension
                document.body.appendChild(link);
                link.click();
                return res;
            }).catch(err => {
                throw err;
            });
    },

    exportTransactionsToPDF (payload) {
        let headers = { 'Content-Type': 'application/pdf' };
        let url = `transactions/export/pdf`;
        if (payload) {
            url += `?count=${payload.count}&page=${payload.page}`
            url += payload.SellerUserId ? `&SellerUserId=${payload.SellerUserId}` : ''
            url += payload.Invoiced === 'true' ? '&Invoiced=true' : (payload.Invoiced === 'false' ? '&Invoiced=false' : '')
            url += payload.StartDateChecked ? `&StartDate=${payload.StartDate}` : ''
            url += payload.EndDateChecked ? `&EndDate=${payload.EndDate}` : ''
            url += payload.InvoiceNo && payload.InvoiceNo.length > 0 ? `&InvoiceNo=${payload.InvoiceNo}` : ''
            url += payload.AdviceRef && payload.AdviceRef.length > 0 ? `&AdviceRef=${payload.AdviceRef}` : ''
        }
        return API.post(url, {}, headers, 'blob').then(res => {
            let blob = new Blob([res]);
            let openUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = openUrl;
            var timestamp = moment().format('YYYY-MM-DD.hh:mm:ss');
            link.setAttribute('download', `transactions-${timestamp}.pdf`); //or any other extension
            document.body.appendChild(link);
            link.click();
            return res;
        }).catch(err => {
            throw err;
        });
    },

    exportTransactionToPDF (payload) {
        let headers = { 'Content-Type': 'application/pdf' };
        let url = `transactions/${payload.id}/export`;
        return API.get(url, headers, 'blob').then(res => {
            let blob = new Blob([res]);
            let openUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = openUrl;
            var timestamp = moment().format('YYYY-MM-DD');
            link.setAttribute('download', `Advice-${payload.adviceRef}-${timestamp}.pdf`);
            document.body.appendChild(link);
            link.click();
            return res;
        }).catch(err => {
            throw err;
        });
    },

    // Invoices
    getAllInvoices(payload) {
        let url = 'invoices';
        let headers = { 'Content-Type': 'application/json' };
        if (payload) {
            url += `?count=${payload.count}&page=${payload.page}`
            // url += payload.Invoiced === 'true' ? '&Invoiced=true' : (payload.Invoiced === 'false' ? '&Invoiced=false' : '')
            // url += payload.StartDateChecked ? `&StartDate=${payload.StartDate}` : ''
            // url += payload.EndDateChecked ? `&EndDate=${payload.EndDate}` : ''
            // url += payload.InvoiceNo && payload.InvoiceNo.length > 0 ? `&InvoiceNo=${payload.InvoiceNo}` : ''
            // url += payload.AdviceRef && payload.AdviceRef.length > 0 ? `&AdviceRef=${payload.AdviceRef}` : ''
        }
        return API.get(url, headers)
    },

    exportInvoicesToExcel: (payload) => {
        let headers = { 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' };
        let url = `invoices/export/excel`;
        if (payload) {
            url += `?count=${payload.count}&page=${payload.page}`
            url += payload.Invoiced === 'true' ? '&Invoiced=true' : (payload.Invoiced === 'false' ? '&Invoiced=false' : '')
            url += payload.StartDateChecked ? `&StartDate=${payload.StartDate}` : ''
            url += payload.EndDateChecked ? `&EndDate=${payload.EndDate}` : ''
            url += payload.InvoiceNo && payload.InvoiceNo.length > 0 ? `&InvoiceNo=${payload.InvoiceNo}` : ''
            url += payload.AdviceRef && payload.AdviceRef.length > 0 ? `&AdviceRef=${payload.AdviceRef}` : ''
        }
        return API.get(url, headers, 'blob').then(res => {
            let blob = new Blob([res]);
            let openUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = openUrl;
            var timestamp = moment().format('YYYY-MM-DD.hh:mm:ss');
            link.setAttribute('download', `invoices-${timestamp}.csv`); //or any other extension
            document.body.appendChild(link);
            link.click();
            return res;
        }).catch(err => {
            throw err;
        });
    },

    exportInvoiceToPDF: (payload) => {
        let headers = { 'Content-Type': 'application/pdf' };
        let url = `invoices/${payload.invoiceId}/export/pdf`;
        return API.get(url, headers, 'blob').then(res => {
            let blob = new Blob([res]);
            let openUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = openUrl;
            var timestamp = moment().format('YYYY-MM-DD');
            link.setAttribute('download', `Advice-${payload.adviceRef}-${timestamp}.pdf`); //or any other extension
            document.body.appendChild(link);
            link.click();
            return res;
        }).catch(err => {
            throw err;
        });
    },

    addNewAdvice: (payload) => {
        let headers = { 'Content-Type': 'application/json-patch+json' };
        return API.post('advice', payload, headers).then(res => {
            return res.data;
        }).catch(err => {
            throw err;
        });
    },
}
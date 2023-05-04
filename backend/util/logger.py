import datetime
from database.models import User

class Logger():

    MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

    def __init__(self) -> None:
        pass

    def log_request(self, request):
        date, time = Logger.get_date_time()
        being_requested = User.query.get_or_404(request.user_id)
        if request.status == 'pending':
            data = f'{request.requester.username} ({request.requester.first_name} {request.requester.last_name}) - SENT: {request.request} request to: {being_requested.username} ({being_requested.first_name} {being_requested.last_name})'
        else:
            data=f'{being_requested.username} ({being_requested.first_name} {being_requested.last_name}) - {request.status} {request.request} request sent by: {request.requester.username} ({request.requester.first_name} {request.requester.last_name})'
        self.log('REQUEST', date, time, data)

    def log(self, transaction, date, time, info):
        data = 'Transaction: ' + transaction
        data += '\tDate: ' + date
        data += '\tTime: ' + time
        data += '\nData:\n'+ info + '\n\n\n'
        file = open('log.txt', 'a')
        file.write(data)
        file.close()

    def get_date_time():
        date_time = datetime.datetime.now()
        return f'{date_time.year}-{Logger.MONTHS[int(date_time.month)-1]}-{date_time.day}', f'{date_time.hour}:{date_time.minute}:{date_time.second}'


logger = Logger()
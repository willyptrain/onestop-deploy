import gspread
from oauth2client.service_account import ServiceAccountCredentials


credential = ServiceAccountCredentials.from_json_keyfile_name("credentials.json",
                                                              ["https://spreadsheets.google.com/feeds", 
                                                              "https://www.googleapis.com/auth/spreadsheets",  
                                                              "https://www.googleapis.com/auth/drive.file",
                                                              "https://www.googleapis.com/auth/drive"])
client = gspread.authorize(credential)
gsheet = client.open("OneStopCardShop").sheet1


row_fields = ['Date', 'Poster ID', 'Poster Email', 'Trade or Sale', 'Trade ID', 'Sale ID', 'Status','Insurance', 'TradeOffer ID', 'TradeOrder ID', 'SaleOrder ID', 'Bidder ID', 'Bidder Email']


def get_entire_sheet():
    return gsheet.get_all_records()


# req = request.get_json()
#     row = [req["email"], req["date"], req["score"]]
#     gsheet.insert_row(row, 2)

#row consists of values for reach row field, should be dict object
def post_new_row(row):
    row_list = []
    for field in row_fields:
        if(field in row):
            row_list.append(row[field])
        else:
            row_list.append("")
    gsheet.insert_row(row_list, 2)



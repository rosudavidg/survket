import smtplib


def send_activation_link(to_email, token):
    gmail_user = 'survket@gmail.com'
    gmail_password = 'fozciw-Corxuh-9curro'

    sent_from = 'survket@gmail.com'

    to = [to_email]
    subject = 'Survket Activation link'
    body = """\
    Hello and thanks for registration!\n
    Here is your activation link:\n
    %s\n\n
    David
    """ % ('https://www.survket.davidrosu.tech/confirm/' + token)

    email_text = '\r\n'.join(['To: %s' % ','.join(to),
                              'From: %s' % sent_from,
                              'Subject: %s' % subject,
                              '', body])

    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.ehlo()
        server.login(gmail_user, gmail_password)
        server.sendmail(sent_from, to, email_text)
        server.close()

        return True
    except:
        return False

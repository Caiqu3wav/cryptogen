package hooks

import (
	"crypto/tls"
	"fmt"
	"gopkg.in/gomail.v2"
)

func SendResetEmail(toEmail string, ResetLink string) error {
	// Configurações do SMTP
	smtpHost := "smtp.gmail.com"
	smtpPort := 587
	smtpUser := "your-email@gmail.com"
	smtpPass := "your-email-password"


	m := gomail.NewMessage()
	m.SetHeader("From", "noreply@localhost")
	m.SetHeader("To", ToEmail)
	m.SetHeader("Subject", "Password Reset")
	m.SetBody("text/html", fmt.Sprintf("Click <a href=\"%s\">here</a> to reset your password.", ResetLink))

	dialer := gomail.NewDialer(smtpHost, smtpPort, smtpUser, smtpPass)
	dialer.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	if err := dialer.DialAndSend(m); err != nil {
		return err
	}

	return nil
}
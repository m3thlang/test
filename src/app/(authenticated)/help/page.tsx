'use client'

import { Typography, Collapse, Space, Card } from 'antd'
import { QuestionCircleOutlined, InfoCircleOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
const { Panel } = Collapse
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function HelpCenterPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const faqs = [
    {
      question: 'How do I create a delivery?',
      answer:
        "To create a delivery, navigate to the 'Create Delivery' page from the main menu. Fill in the required details such as origin, destination, and delivery date, then submit the form.",
    },
    {
      question: 'How can I track my deliveries?',
      answer:
        "You can track your deliveries by going to the 'My Deliveries' page. Here, you'll see a list of all your active deliveries and their current status.",
    },
    {
      question: "What should I do if there's an issue with my delivery?",
      answer:
        "If you encounter any issues with your delivery, please contact our support team immediately through the 'Contact Support' button below.",
    },
  ]

  const supportInfo = [
    {
      title: 'Contact Support',
      content:
        'For urgent matters, please email us at support@example.com or call our hotline at +1 (123) 456-7890.',
    },
    {
      title: 'Operating Hours',
      content:
        'Our support team is available Monday to Friday, 9 AM to 5 PM EST.',
    },
    {
      title: 'Feedback',
      content:
        "We value your feedback! Please use the 'Submit Feedback' button below to help us improve our service.",
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2} style={{ textAlign: 'center' }}>
          Help Center
        </Title>
        <Paragraph style={{ textAlign: 'center' }}>
          Find answers to frequently asked questions and get support information
          here.
        </Paragraph>

        <Card
          title={
            <Title level={4}>
              <QuestionCircleOutlined /> Frequently Asked Questions
            </Title>
          }
        >
          <Collapse>
            {faqs.map((faq, index) => (
              <Panel header={faq.question} key={index}>
                <Paragraph>{faq.answer}</Paragraph>
              </Panel>
            ))}
          </Collapse>
        </Card>

        <Card
          title={
            <Title level={4}>
              <InfoCircleOutlined /> Support Information
            </Title>
          }
        >
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            {supportInfo.map((info, index) => (
              <Card key={index} size="small" title={info.title}>
                <Paragraph>{info.content}</Paragraph>
              </Card>
            ))}
          </Space>
        </Card>
      </Space>
    </PageLayout>
  )
}

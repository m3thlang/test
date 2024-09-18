'use client'

import { Typography, List, Card, Row, Col } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function CitiesPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: cities, isLoading } = Api.city.findMany.useQuery({
    orderBy: { name: 'asc' },
  })

  const handleCityClick = (cityId: string) => {
    router.push(`/cities/${cityId}`)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Turkish Cities</Title>
      <Paragraph>
        Browse through the list of Turkish cities to find deliveries in your
        desired location.
      </Paragraph>

      {isLoading ? (
        <Paragraph>Loading cities...</Paragraph>
      ) : (
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={cities}
          renderItem={city => (
            <List.Item>
              <Card
                hoverable
                onClick={() => handleCityClick(city.id)}
                cover={
                  <div style={{ padding: '24px', textAlign: 'center' }}>
                    <EnvironmentOutlined
                      style={{ fontSize: '48px', color: '#1890ff' }}
                    />
                  </div>
                }
              >
                <Card.Meta
                  title={city.name}
                  description={
                    city.region
                      ? `Region: ${city.region}`
                      : 'No region specified'
                  }
                />
              </Card>
            </List.Item>
          )}
        />
      )}
    </PageLayout>
  )
}

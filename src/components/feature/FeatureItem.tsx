import { Center, Flex, Text } from '@chakra-ui/layout';
import { Button, ButtonGroup, Card, CardBody, CardFooter, Switch } from '@chakra-ui/react';
import { IdFeature } from '@/utils/common';
import { IoOpen, IoOptions } from 'react-icons/io5';
import { useEnableFeatureMutation } from '@/api/hooks';
import { guild as view } from '@/config/translations/guild';
import Router from 'next/router';

export function FeatureItem({
  guild,
  feature,
  enabled,
}: {
  guild: string;
  feature: IdFeature;
  enabled: boolean;
}) {
  const t = view.useTranslations();
  const mutation = useEnableFeatureMutation(guild, feature.id);

  return (
    <Card variant="primary">
      <CardBody as={Flex} direction="row" gap={3}>
        <Center
          p={5}
          bg={enabled ? 'Brand' : 'MainBackground'}
          color={enabled ? 'white' : undefined}
          rounded="xl"
          w="60px"
          h="60px"
        >
          {feature.icon}
        </Center>
        <Flex direction="column" flex={1}>
          <Text fontSize="xl" fontWeight="600">
            {feature.name}
          </Text>
          <Text color="TextSecondary">{feature.description}</Text>
        </Flex>
        <>
          <Switch
            disabled={mutation.isLoading}
            h="fit-content"
            isChecked={enabled}
            onChange={(e) => mutation.mutate({ enabled: e.target.checked })}
          />
        </>
      </CardBody>
      <CardFooter as={ButtonGroup}>
        <Button
          disabled={mutation.isLoading}
          {...(enabled
            ? {
                variant: 'action',
                rounded: '2xl',
                leftIcon: <IoOptions />,
                onClick: () => Router.push(`/guilds/${guild}/features/${feature.id}`),
                children: t.bn['config feature'],
              }
            : {
                leftIcon: <IoOpen />,
                onClick: () => mutation.mutate({ enabled: true }),
                children: t.bn['enable feature'],
              })}
        />
      </CardFooter>
    </Card>
  );
}

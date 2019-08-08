import React from 'react';
import {Box, Button, Card, Flex, Text} from 'rimble-ui';

interface Props {
  goBack: Function;
  title: string
}

interface State {

}

export default class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  goBack() {
    this.props.goBack();
  }

  render() {
    return (
      <div style={{width: '100%', backgroundColor: 'white',}}>
        <Flex>
          <Box width={9 / 10} mt={2}>
            <Text fontWeight={1000} color='#84d1d4' mx={1} my={1}
                  textAlign={'center'}>
              {this.props.title}
            </Text>
          </Box>
          <Box width={1 / 10}>
            <Button.Text
              textAlign={'right'}
              icononly
              icon={"Close"}
              color={"moon-gray"}
              mt={0}
              mr={0}
              onClick={this.goBack.bind(this)}
            />
          </Box>
        </Flex>
        <div style={{
          width: 'auto',
          height: '1px',
          backgroundColor: 'gray',
          marginLeft: '5px',
          marginRight: '5px'
        }}></div>
      </div>
    );
  }
}

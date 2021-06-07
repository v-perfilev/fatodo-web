import * as React from 'react';
import {FC} from 'react';
import {Container, Typography} from '@material-ui/core';
import withHeader from '../shared/hocs/with-header/with-header';
import withVerticalPadding from '../shared/hocs/with-vertical-padding/with-vertical-padding';
import {flowRight} from 'lodash';

const Home: FC = () => {
  return (
    <Container>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor porttitor nunc. Nam neque sapien, semper
        sit amet dignissim tempus, porttitor ut orci. Vivamus et tortor bibendum, viverra nulla non, bibendum leo. Nunc
        diam sapien, congue ac suscipit in, malesuada eget ligula. Suspendisse eget laoreet augue. Nunc sed ante sit
        amet risus vestibulum aliquet. Vivamus pellentesque nisi eu leo bibendum congue. Nulla vestibulum neque sit amet
        urna placerat, a tempor ipsum laoreet.
      </Typography>
      <Typography>
        Nunc sit amet neque eleifend, ultrices eros aliquam, condimentum nisi. Phasellus elit dolor, tincidunt sed nisi
        ac, lobortis fermentum ante. Proin rhoncus odio mauris, quis tempus urna placerat vel. In quis tortor at turpis
        tempus sodales sit amet vel eros. Quisque id velit purus. Sed ultricies mattis orci et maximus. Suspendisse
        massa felis, faucibus ac nibh in, vulputate malesuada augue.
      </Typography>
      <Typography>
        Vestibulum at aliquam massa. Praesent in accumsan lectus. Ut ultricies risus felis, eu consectetur ante
        elementum a. Integer accumsan congue dui. Proin vel semper velit. Proin vitae tempor massa, a mollis ex. Morbi
        quis ultricies turpis. Vivamus mi purus, pellentesque a metus ac, porta vestibulum ipsum. Integer aliquet libero
        ac magna blandit, id interdum tortor lacinia. Aliquam sit amet aliquam orci. Curabitur vel ex suscipit, dictum
        velit eget, convallis ante.
      </Typography>
      <Typography>
        In eu dapibus augue. Etiam faucibus massa lacus, et rutrum ligula venenatis quis. Donec a erat magna. Aliquam
        erat volutpat. Sed quam est, convallis ac dolor quis, eleifend bibendum ipsum. Pellentesque eget varius purus.
        Donec sit amet sollicitudin leo, dapibus vestibulum orci. Donec pulvinar metus non scelerisque commodo. Etiam
        scelerisque nunc eget tellus accumsan, vitae convallis nisl fringilla. Nulla facilisi. Aliquam quis odio vitae
        mi luctus ultrices. Fusce varius pharetra feugiat. Vivamus lacinia est ac tortor scelerisque, at maximus est
        tristique. Sed scelerisque risus ac dictum volutpat. Donec a erat id elit eleifend dictum eget at lacus.
      </Typography>
      <Typography>
        Mauris velit nunc, volutpat nec odio iaculis, tempus molestie odio. Curabitur luctus vel eros at tempor.
        Pellentesque eu elit et enim rutrum sodales. Nullam lectus mauris, bibendum convallis rhoncus at, sagittis a
        lorem. Ut enim tellus, posuere tincidunt porttitor eget, imperdiet a tellus. Suspendisse mi nunc, euismod a
        aliquet at, molestie in nibh. Donec ac libero nec risus ornare fermentum. Cras iaculis auctor fermentum.
      </Typography>
    </Container>
  );
};

export default flowRight([withHeader, withVerticalPadding])(Home);

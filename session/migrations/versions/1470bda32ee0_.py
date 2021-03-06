"""empty message

Revision ID: 1470bda32ee0
Revises: 1f1f249ae2a9
Create Date: 2021-10-18 13:59:55.731555

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1470bda32ee0'
down_revision = '1f1f249ae2a9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('emp') as batch_op:
        batch_op.drop_column('address')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('emp', sa.Column('address', sa.VARCHAR(length=100), nullable=True))
    # ### end Alembic commands ###

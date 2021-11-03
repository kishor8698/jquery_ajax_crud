"""empty message

Revision ID: b3a69fa81287
Revises: 04f987224058
Create Date: 2021-10-19 10:48:45.626596

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b3a69fa81287'
down_revision = '04f987224058'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('customer',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('customer_name', sa.String(length=25), nullable=True),
    sa.Column('customer_email', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('order',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('order_date', sa.DateTime(), nullable=True),
    sa.Column('order_number', sa.Integer(), nullable=True),
    sa.Column('customer_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['customer_id'], ['customer.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('emp')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('emp',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(length=100), nullable=True),
    sa.Column('city', sa.VARCHAR(length=50), nullable=True),
    sa.Column('address', sa.VARCHAR(length=100), nullable=True),
    sa.Column('state', sa.VARCHAR(length=100), nullable=True),
    sa.Column('pin_code', sa.VARCHAR(length=100), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('order')
    op.drop_table('customer')
    # ### end Alembic commands ###
